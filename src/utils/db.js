// utils/db.js
import mysql from 'mysql2/promise'; // For async operations

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Export the pool
export { pool };

// Optionally, export a connect function if needed
export async function connectToDatabase() {
  const connection = await pool.getConnection();
  return connection;
}
