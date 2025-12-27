import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  findByEmail,
  findByUsername,
  createUser,
  updateLastLogin
} from '../models/userModel.js';

export async function registerController(req, res) {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const existingEmail = await findByEmail(email);
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const existingUsername = await findByUsername(username);
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already in use' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = await createUser({
      email,
      username,
      passwordHash,
      role: 'PLAYER'
    });

    const token = jwt.sign(
      { id: userId, role: 'PLAYER' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Internal server error'
    });
  }
}

export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const user = await findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    await updateLastLogin(user.id);

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Internal server error'
    });
  }
}
