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
import { toResponseError } from '../utils/errors.js';

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

// Inscription d’un nouvel utilisateur
export async function registerController(req, res) {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({
        message: 'Email, pseudo et mot de passe requis.',
        code: 'AUTH_REGISTER_MISSING_FIELDS'
      });
    }

    if (!isEmailValid(email)) {
      return res.status(400).json({
        message: 'Email invalide.',
        code: 'AUTH_INVALID_EMAIL'
      });
    }

    if (!isUsernameValid(username)) {
      return res.status(400).json({
        message: 'Pseudo invalide: 3 à 20 caractères, lettres/chiffres/underscore.',
        code: 'AUTH_INVALID_USERNAME'
      });
    }

    if (!isPasswordValid(password)) {
      return res.status(400).json({
        message: 'Mot de passe: 8 caractères minimum, avec une majuscule, une minuscule et un chiffre.',
        code: 'AUTH_WEAK_PASSWORD'
      });
    }

    const existingEmail = await findByEmail(email);
    if (existingEmail) {
      return res.status(400).json({
        message: 'Email déjà utilisé.',
        code: 'AUTH_EMAIL_IN_USE'
      });
    }

    const existingUsername = await findByUsername(username);
    if (existingUsername) {
      return res.status(400).json({
        message: 'Pseudo déjà utilisé.',
        code: 'AUTH_USERNAME_IN_USE'
      });
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
    const { status, message, code } = toResponseError(
      error,
      'Erreur lors de l’inscription.',
      'AUTH_REGISTER_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}

// Connexion d’un utilisateur existant
export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email et mot de passe requis.',
        code: 'AUTH_LOGIN_MISSING_FIELDS'
      });
    }

    const user = await findByEmail(email);
    if (!user) {
      return res.status(401).json({
        message: 'Compte introuvable.',
        code: 'AUTH_ACCOUNT_NOT_FOUND'
      });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({
        message: 'Mot de passe incorrect.',
        code: 'AUTH_INCORRECT_PASSWORD'
      });
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
    const { status, message, code } = toResponseError(
      error,
      'Erreur de connexion.',
      'AUTH_LOGIN_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}

// Demande de réinitialisation de mot de passe
export async function requestPasswordResetController(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        message: 'Email requis.',
        code: 'AUTH_RESET_EMAIL_MISSING'
      });
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
    const { status, message, code } = toResponseError(
      error,
      'Erreur lors de la demande de réinitialisation.',
      'AUTH_RESET_REQUEST_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}

// Réinitialisation du mot de passe
export async function resetPasswordController(req, res) {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({
        message: 'Token et mot de passe requis.',
        code: 'AUTH_RESET_MISSING_FIELDS'
      });
    }

    if (!isPasswordValid(password)) {
      return res.status(400).json({
        message: 'Mot de passe: 8 caractères minimum, avec une majuscule, une minuscule et un chiffre.',
        code: 'AUTH_WEAK_PASSWORD'
      });
    }

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const record = await getPasswordResetToken(tokenHash);
    if (!record || record.used_at) {
      return res.status(400).json({
        message: 'Lien invalide ou déjà utilisé.',
        code: 'AUTH_RESET_TOKEN_INVALID'
      });
    }

    const expiresAt = new Date(record.expires_at);
    if (expiresAt < new Date()) {
      return res.status(400).json({
        message: 'Lien expiré.',
        code: 'AUTH_RESET_TOKEN_EXPIRED'
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await updateUserPassword(record.user_id, passwordHash);
    await markPasswordResetTokenUsed(record.id);

    return res.status(200).json({ message: 'Mot de passe mis à jour.' });
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(
      error,
      'Erreur lors de la réinitialisation du mot de passe.',
      'AUTH_RESET_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}
