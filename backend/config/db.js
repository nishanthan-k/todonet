// config/db.js
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

export const connectDB = new Pool({
  connectionString: process.env.DATABASE_URL,
});
