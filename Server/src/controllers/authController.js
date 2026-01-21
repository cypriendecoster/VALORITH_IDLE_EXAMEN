import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import {
  findByEmail,
  findByUsername,
  createUser,
  updateLastLogin,
  updateUserPassword
} from '../models/userModel.js';
import { bootstrapNewPlayer } from '../services/playerInitService.js';
import {
  insertPasswordResetToken,
  getPasswordResetToken,
  markPasswordResetTokenUsed
} from '../models/passwordResetTokenModel.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

function isPasswordValid(password) {
  return PASSWORD_REGEX.test(password);
}

function isEmailValid(email) {
  return EMAIL_REGEX.test(email);
}

function isUsernameValid(username) {
  return USERNAME_REGEX.test(username);
}

export async function registerController(req, res) {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    if (!isEmailValid(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!isUsernameValid(username)) {
      return res.status(400).json({ message: 'Invalid username format' });
    }

    if (!isPasswordValid(password)) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters with upper, lower, and number.'
      });
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

    await bootstrapNewPlayer(userId);

    const token = jwt.sign(
      { id: userId, role: 'PLAYER' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
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
      return res.status(401).json({ message: 'Account not found' });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    await updateLastLogin(user.id);

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message || 'Internal server error'
    });
  }
}



export async function requestPasswordResetController(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Missing email' });
    }

    const user = await findByEmail(email);
    if (user) {
      const token = crypto.randomBytes(32).toString('hex');
      const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

      await insertPasswordResetToken({
        userId: user.id,
        tokenHash,
        expiresAt
      });

      return res.status(200).json({
        message: "Si le compte existe, un lien de réinitialisation a été envoyé."
      });
    }

    return res.status(200).json({
      message: "Si le compte existe, un lien de réinitialisation a été envoyé."
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message || 'Internal server error'
    });
  }
}

export async function resetPasswordController(req, res) {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    if (!isPasswordValid(password)) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters with upper, lower, and number.'
      });
    }

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const record = await getPasswordResetToken(tokenHash);
    if (!record || record.used_at) {
      return res.status(400).json({ message: 'Invalid or used token' });
    }

    const expiresAt = new Date(record.expires_at);
    if (expiresAt < new Date()) {
      return res.status(400).json({ message: 'Token expired' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await updateUserPassword(record.user_id, passwordHash);
    await markPasswordResetTokenUsed(record.id);

    return res.status(200).json({ message: 'Password updated' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message || 'Internal server error'
    });
  }
}
