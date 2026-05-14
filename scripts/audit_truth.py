"""
Pre-deploy AUDIT script.
Pulls authoritative numbers from PostgreSQL to verify every factual claim
on the website. Output is human-readable; pipe into a file if needed.

Read-only. Run from project root:
    python scripts/audit_truth.py
"""
from __future__ import annotations

import os
import sys
import json
from pathlib import Path
from datetime import datetime, timedelta

import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv


def get_conn():
    load_dotenv(Path(__file__).resolve().parent.parent / ".env")
    url = os.environ.get("DATABASE_URL")
    if not url:
        sys.exit("DATABASE_URL missing in .env")
    return psycopg2.connect(url, options="-c default_transaction_read_only=on")


def excel_or_yyyymmdd_to_date(val):
    """
    Race_Date stored as double precision. Two common encodings:
      (a) YYYYMMDD (e.g. 20240501)
      (b) Excel serial (days since 1899-12-30)
    We sniff which one it is.
    """
    if val is None:
        return None
    v = float(val)
    if v >= 19000000 and v <= 21001231:
        s = str(int(v))
        try:
            return datetime.strptime(s, "%Y%m%d").date()
        except ValueError:
            return None
    if 0 < v < 80000:  # Excel serial range
        base = datetime(1899, 12, 30)
        return (base + timedelta(days=int(v))).date()
    return None


def header(t):
    print(f"\n{'=' * 8} {t} {'=' * 8}")


def main() -> None:
    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:

            # --- 1. RACE_INFORMATION ---
            header("race_information")
            cur.execute('SELECT MIN("Race_Date") AS lo, MAX("Race_Date") AS hi, COUNT(*) AS n FROM race_information')
            r = cur.fetchone()
            print(f"  rows           : {r['n']:,}")
            print(f"  Race_Date raw  : min={r['lo']}  max={r['hi']}")
            print(f"  Race_Date parsed lo  : {excel_or_yyyymmdd_to_date(r['lo'])}")
            print(f"  Race_Date parsed hi  : {excel_or_yyyymmdd_to_date(r['hi'])}")

            cur.execute('SELECT MIN("Race_Season") AS lo, MAX("Race_Season") AS hi, COUNT(DISTINCT "Race_Season") AS n FROM race_information')
            r = cur.fetchone()
            print(f"  Race_Season    : min={r['lo']}  max={r['hi']}  distinct={r['n']}")

            cur.execute('SELECT "Race_Venue" AS v, COUNT(*) AS n FROM race_information GROUP BY 1 ORDER BY 2 DESC')
            print(f"  Venues         : {cur.fetchall()}")

            # --- 2. HORSE_INFORMATION ---
            header("horse_information")
            cur.execute('SELECT COUNT(*) AS n FROM horse_information')
            print(f"  rows : {cur.fetchone()['n']:,}")
            cur.execute("""SELECT column_name FROM information_schema.columns
                           WHERE table_name='horse_information' ORDER BY ordinal_position""")
            cols = [c["column_name"] for c in cur.fetchall()]
            print(f"  cols : {cols}")
            cur.execute('SELECT "Horse_Origin" AS v, COUNT(*) AS n FROM horse_information GROUP BY 1 ORDER BY 2 DESC LIMIT 10')
            print(f"  Origins top10 : {cur.fetchall()}")

            # --- 3. RACE_RESULTS ---
            header("race_results")
            cur.execute('SELECT COUNT(*) AS n FROM race_results')
            print(f"  rows : {cur.fetchone()['n']:,}")
            cur.execute('SELECT COUNT(DISTINCT "Jockey_ID") AS nj, COUNT(DISTINCT "Trainer_ID") AS nt FROM race_results')
            r = cur.fetchone()
            print(f"  distinct jockeys  : {r['nj']}")
            print(f"  distinct trainers : {r['nt']}")

            # --- 4. RACE_SECTIONAL_TIME ---
            header("race_sectional_time")
            cur.execute("""SELECT MIN(ri."Race_Date") AS lo, MAX(ri."Race_Date") AS hi,
                                  COUNT(*) AS rows,
                                  COUNT(DISTINCT rst."Race_Key") AS races
                           FROM race_sectional_time rst
                           JOIN race_information ri USING ("Race_Key")""")
            r = cur.fetchone()
            print(f"  rows={r['rows']:,}  races={r['races']:,}")
            print(f"  date lo={excel_or_yyyymmdd_to_date(r['lo'])}  hi={excel_or_yyyymmdd_to_date(r['hi'])}")

            # --- 5. RACE_SECTIONAL_POSITION (if exists) ---
            cur.execute("""SELECT table_name FROM information_schema.tables
                           WHERE table_schema='public' AND table_name LIKE '%sectional%'""")
            print(f"  sectional tables : {[r['table_name'] for r in cur.fetchall()]}")

            # --- 6. RACE_DIVIDENDS ---
            header("race_dividends")
            cur.execute("""SELECT MIN(ri."Race_Date") AS lo, MAX(ri."Race_Date") AS hi, COUNT(*) AS n
                           FROM race_dividends d JOIN race_information ri USING ("Race_Key")""")
            r = cur.fetchone()
            print(f"  rows={r['n']:,}  lo={excel_or_yyyymmdd_to_date(r['lo'])}  hi={excel_or_yyyymmdd_to_date(r['hi'])}")

            # --- 7. HORSE_VETERINARY_RECORDS ---
            header("horse_veterinary_records")
            cur.execute("""SELECT column_name, data_type FROM information_schema.columns
                           WHERE table_name='horse_veterinary_records' ORDER BY ordinal_position""")
            cols = cur.fetchall()
            print(f"  cols : {[(c['column_name'], c['data_type']) for c in cols]}")
            # Look for a date column
            date_col = next((c["column_name"] for c in cols if "date" in c["column_name"].lower()), None)
            if date_col:
                cur.execute(f'SELECT MIN("{date_col}") AS lo, MAX("{date_col}") AS hi, COUNT(*) AS n FROM horse_veterinary_records')
                r = cur.fetchone()
                lo = excel_or_yyyymmdd_to_date(r["lo"]) if isinstance(r["lo"], (int, float)) else r["lo"]
                hi = excel_or_yyyymmdd_to_date(r["hi"]) if isinstance(r["hi"], (int, float)) else r["hi"]
                print(f"  rows={r['n']:,}  lo={lo}  hi={hi}  (col={date_col})")

            # --- 8. HORSE_TRACKWORK_GALLOP ---
            header("horse_trackwork_gallop")
            cur.execute("""SELECT MIN("Date") AS lo, MAX("Date") AS hi, COUNT(*) AS n FROM horse_trackwork_gallop""")
            r = cur.fetchone()
            lo = excel_or_yyyymmdd_to_date(r["lo"]) if isinstance(r["lo"], (int, float)) else r["lo"]
            hi = excel_or_yyyymmdd_to_date(r["hi"]) if isinstance(r["hi"], (int, float)) else r["hi"]
            print(f"  rows={r['n']:,}  lo={lo}  hi={hi}")

            # --- 9. HORSE_TRACKWORK_TROTTING ---
            header("horse_trackwork_trotting")
            cur.execute("""SELECT MIN("Date") AS lo, MAX("Date") AS hi, COUNT(*) AS n FROM horse_trackwork_trotting""")
            r = cur.fetchone()
            lo = excel_or_yyyymmdd_to_date(r["lo"]) if isinstance(r["lo"], (int, float)) else r["lo"]
            hi = excel_or_yyyymmdd_to_date(r["hi"]) if isinstance(r["hi"], (int, float)) else r["hi"]
            print(f"  rows={r['n']:,}  lo={lo}  hi={hi}")

            # --- 10. BARRIER TRIAL ---
            header("barrier_trial_information")
            cur.execute("""SELECT MIN("Trial_Date") AS lo, MAX("Trial_Date") AS hi, COUNT(*) AS n FROM barrier_trial_information""")
            r = cur.fetchone()
            lo = excel_or_yyyymmdd_to_date(r["lo"]) if isinstance(r["lo"], (int, float)) else r["lo"]
            hi = excel_or_yyyymmdd_to_date(r["hi"]) if isinstance(r["hi"], (int, float)) else r["hi"]
            print(f"  rows={r['n']:,}  lo={lo}  hi={hi}")

            # --- 11. WEATHER ---
            header("weather_condition")
            cur.execute("""SELECT MIN("Race_Date") AS lo, MAX("Race_Date") AS hi, COUNT(*) AS n FROM weather_condition""")
            r = cur.fetchone()
            lo = excel_or_yyyymmdd_to_date(r["lo"]) if isinstance(r["lo"], (int, float)) else r["lo"]
            hi = excel_or_yyyymmdd_to_date(r["hi"]) if isinstance(r["hi"], (int, float)) else r["hi"]
            print(f"  rows={r['n']:,}  lo={lo}  hi={hi}")

            # --- 12. AGGREGATE STRUCTURED DATAPOINTS ---
            header("aggregate row counts (all base tables)")
            cur.execute("""SELECT table_name FROM information_schema.tables
                           WHERE table_type='BASE TABLE'
                             AND table_schema NOT IN ('pg_catalog','information_schema','pg_toast')
                           ORDER BY table_name""")
            tables = [r["table_name"] for r in cur.fetchall()]
            total = 0
            for t in tables:
                try:
                    cur.execute(f'SELECT COUNT(*) AS n FROM "{t}"')
                    n = cur.fetchone()["n"]
                    total += n
                    print(f"  {t:45s} {n:>15,}")
                except Exception as e:
                    print(f"  {t:45s} ERROR: {e}")
            print(f"\n  >>> grand total rows : {total:,}")


if __name__ == "__main__":
    main()
