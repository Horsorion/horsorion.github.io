"""
Extract real headline metrics for Horsorion website.
Outputs:
  - hero counters (years, races, horses, sectional records)
  - coverage matrix per dataset (start year, row count, freshness)
  - distinct venues / classes / season range
"""

from __future__ import annotations

import os
import sys
from pathlib import Path
import json

import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv


def get_conn():
    load_dotenv(Path(__file__).resolve().parent.parent / ".env")
    url = os.environ.get("DATABASE_URL")
    if not url:
        sys.exit("DATABASE_URL missing in .env")
    return psycopg2.connect(url, options="-c default_transaction_read_only=on")


def one(cur, sql, params=None):
    cur.execute(sql, params or ())
    return cur.fetchone()


def all_rows(cur, sql, params=None):
    cur.execute(sql, params or ())
    return cur.fetchall()


def main() -> None:
    out = {}
    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:

            # Race_Date is double precision — try min/max raw values
            row = one(cur, 'SELECT MIN("Race_Date") AS min_d, MAX("Race_Date") AS max_d, COUNT(*) AS n FROM race_information')
            out["race_information_date_range"] = row

            # Sample one Race_Date to confirm format
            row = one(cur, 'SELECT "Race_Date", "Race_Key", "Race_Venue", "Race_Class", "Race_Going" FROM race_information ORDER BY "Race_Date" DESC LIMIT 1')
            out["latest_race_sample"] = row

            row = one(cur, 'SELECT "Race_Date", "Race_Key", "Race_Venue" FROM race_information ORDER BY "Race_Date" ASC LIMIT 1')
            out["earliest_race_sample"] = row

            # Race_Season distinct (this might be cleaner than Race_Date if it's a year-like value)
            rows = all_rows(cur, 'SELECT DISTINCT "Race_Season" AS season FROM race_information ORDER BY season')
            out["seasons"] = [r["season"] for r in rows]

            # Distinct venues
            rows = all_rows(cur, 'SELECT "Race_Venue" AS venue, COUNT(*) AS n FROM race_information GROUP BY "Race_Venue" ORDER BY n DESC')
            out["venues"] = rows

            # Distinct classes
            rows = all_rows(cur, 'SELECT "Race_Class" AS class, COUNT(*) AS n FROM race_information GROUP BY "Race_Class" ORDER BY n DESC LIMIT 20')
            out["classes_top20"] = rows

            # Distinct horse origins
            rows = all_rows(cur, 'SELECT "Horse_Origin" AS origin, COUNT(*) AS n FROM horse_information GROUP BY "Horse_Origin" ORDER BY n DESC LIMIT 10')
            out["horse_origins_top10"] = rows

            # Distinct trainers/jockeys
            n_trainers = one(cur, 'SELECT COUNT(DISTINCT "Trainer_ID") AS n FROM race_results')
            n_jockeys = one(cur, 'SELECT COUNT(DISTINCT "Jockey_ID") AS n FROM race_results')
            out["distinct_trainers"] = n_trainers["n"]
            out["distinct_jockeys"] = n_jockeys["n"]

            # Vet record date range
            row = one(cur, 'SELECT MIN("Record_Date") AS min_d, MAX("Record_Date") AS max_d, COUNT(*) AS n FROM horse_veterinary_records')
            out["vet_date_range"] = row

            # Trackwork gallop date range
            row = one(cur, 'SELECT MIN("Date") AS min_d, MAX("Date") AS max_d, COUNT(*) AS n FROM horse_trackwork_gallop')
            out["trackwork_gallop_range"] = row

            # Trackwork trotting date range
            row = one(cur, 'SELECT MIN("Date") AS min_d, MAX("Date") AS max_d, COUNT(*) AS n FROM horse_trackwork_trotting')
            out["trackwork_trot_range"] = row

            # Barrier trial date range
            row = one(cur, 'SELECT MIN("Trial_Date") AS min_d, MAX("Trial_Date") AS max_d, COUNT(*) AS n FROM barrier_trial_information')
            out["barrier_trial_range"] = row

            # Weather date range
            row = one(cur, 'SELECT MIN("Race_Date") AS min_d, MAX("Race_Date") AS max_d, COUNT(*) AS n FROM weather_condition')
            out["weather_range"] = row

            # Race sectional date range (via join to race_information)
            row = one(cur, '''
                SELECT MIN(ri."Race_Date") AS min_d,
                       MAX(ri."Race_Date") AS max_d,
                       COUNT(DISTINCT ri."Race_Key") AS n_races
                FROM race_sectional_time rst
                JOIN race_information ri USING ("Race_Key")
            ''')
            out["sectional_range"] = row

            # Race dividends earliest/latest via Race_Key linkage
            row = one(cur, '''
                SELECT MIN(ri."Race_Date") AS min_d,
                       MAX(ri."Race_Date") AS max_d,
                       COUNT(*) AS n
                FROM race_dividends rd
                JOIN race_information ri USING ("Race_Key")
            ''')
            out["dividends_range"] = row

    print(json.dumps(out, indent=2, default=str, ensure_ascii=False))


if __name__ == "__main__":
    main()
