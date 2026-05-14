"""
Read-only exploration of Horsorion PostgreSQL database.
Extracts table list, row counts, date ranges for use in the website
(hero counters, coverage matrix, status pills).

Usage:
    python scripts/explore_db.py
"""

from __future__ import annotations

import os
import sys
from pathlib import Path

import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv


SCHEMAS_TO_SKIP = ("pg_catalog", "information_schema", "pg_toast")


def get_conn():
    load_dotenv(Path(__file__).resolve().parent.parent / ".env")
    url = os.environ.get("DATABASE_URL")
    if not url:
        sys.exit("DATABASE_URL missing in .env")
    return psycopg2.connect(url, options="-c default_transaction_read_only=on")


def list_tables(cur) -> list[dict]:
    cur.execute(
        """
        SELECT table_schema, table_name
        FROM information_schema.tables
        WHERE table_type = 'BASE TABLE'
          AND table_schema NOT IN %s
        ORDER BY table_schema, table_name
        """,
        (SCHEMAS_TO_SKIP,),
    )
    return cur.fetchall()


def row_count(cur, schema: str, table: str) -> int:
    cur.execute(f'SELECT COUNT(*) AS n FROM "{schema}"."{table}"')
    return cur.fetchone()["n"]


def columns_of(cur, schema: str, table: str) -> list[dict]:
    cur.execute(
        """
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_schema = %s AND table_name = %s
        ORDER BY ordinal_position
        """,
        (schema, table),
    )
    return cur.fetchall()


def main() -> None:
    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            tables = list_tables(cur)
            print(f"=== Tables ({len(tables)}) ===")
            for t in tables:
                print(f"  {t['table_schema']}.{t['table_name']}")

            print("\n=== Row counts + columns ===")
            for t in tables:
                schema, name = t["table_schema"], t["table_name"]
                try:
                    n = row_count(cur, schema, name)
                except Exception as e:
                    print(f"  {schema}.{name}: count error → {e}")
                    continue
                cols = columns_of(cur, schema, name)
                col_summary = ", ".join(f"{c['column_name']}:{c['data_type']}" for c in cols[:12])
                if len(cols) > 12:
                    col_summary += f", … (+{len(cols) - 12} more)"
                print(f"\n  • {schema}.{name}  rows={n:,}  cols={len(cols)}")
                print(f"      {col_summary}")


if __name__ == "__main__":
    main()
