// pages/api/reset-password.js
import { pool } from '../../utils/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token, newPassword } = req.body;

    try {
      // Validate the token
      const [rows] = await pool.query('SELECT * FROM users WHERE reset_token = ?', [token]);
      if (rows.length === 0) {
        return res.status(400).json({ success: false, message: 'Invalid or expired token' });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password and clear the reset token
      await pool.query('UPDATE users SET password = ?, reset_token = NULL WHERE reset_token = ?', [hashedPassword, token]);

      res.status(200).json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
