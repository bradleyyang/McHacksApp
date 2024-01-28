import sqlite3

conn = sqlite3.connect('database.db')

conn.execute('CREATE TABLE receipts (name TEXT, date TEXT, location TEXT, price TEXT)')

conn.close()