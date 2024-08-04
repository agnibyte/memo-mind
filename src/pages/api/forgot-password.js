// pages/api/forgot-password.js
import { pool } from '../../utils/db';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      // Check if the email exists in the database
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

      if (rows.length > 0) {
        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Update the user with the reset token
        await pool.query('UPDATE users SET reset_token = ? WHERE email = ?', [resetToken, email]);

        // Set up nodemailer transport
        const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        // Email options
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Password Reset Request',
          text: `You requested a password reset. Click the link below to reset your password:\n\nhttp://yourdomain.com/reset-password?token=${resetToken}\n\nIf you did not request this, please ignore this email.`,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({ success: false, message: 'Email not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
