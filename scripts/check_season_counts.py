"""Verify per-season race counts to validate marketing claims like '700+ races/year'."""
import os
from pathlib import Path
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent / ".env")
conn = psycopg2.connect(os.environ["DATABASE_URL"], options="-c default_transaction_read_only=on")
cur = conn.cursor(cursor_factory=RealDictCursor)

cur.execute(
    'SELECT "Race_Season" AS s, COUNT(*) AS n '
    'FROM race_information WHERE "Race_Season" >= 2010 '
    'GROUP BY 1 ORDER BY 1'
)
print("Per-season race count (since 2010):")
for r in cur.fetchall():
    print(f"  {int(r['s'])}: {r['n']:,} races")

cur.execute(
    'SELECT AVG(n)::int AS avg_n, MIN(n) AS min_n, MAX(n) AS max_n FROM ('
    'SELECT "Race_Season" AS s, COUNT(*) AS n FROM race_information '
    'WHERE "Race_Season" >= 2010 GROUP BY 1) t'
)
r = cur.fetchone()
print(f"\nSummary 2010+: avg={r['avg_n']}, min={r['min_n']}, max={r['max_n']}")
