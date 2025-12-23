// src/lib/db.ts
import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',      // YOUR MySQL USERNAME
  password: 'password', // YOUR MySQL PASSWORD
  database: 'rama_care_db',
});
