import sqlite3
import os.path

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(BASE_DIR, "database.db")

conn = sqlite3.connect(db_path)

conn.execute('CREATE TABLE receipts (name TEXT, location TEXT, price TEXT, date TEXT)')

conn.close()