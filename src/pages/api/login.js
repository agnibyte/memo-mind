import { compare } from 'bcryptjs';
import { connectToDatabase } from '../../utils/db';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { email, password } = req.body;

  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const user = rows[0];
    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Optionally, create a session here using a library like next-auth or iron-session

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
