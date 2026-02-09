import bcrypt from 'bcrypt';
import { bootstrapNewPlayer } from './playerInitService.js';
import {
  deletePlayerResources,
  deletePlayerFactories,
  deletePlayerRealms,
  deletePlayerSkills,
  deletePlayerState,
  deletePlayerStats,
  deletePlayerSessions
} from '../models/userCleanupModel.js';
import { deleteUserBadges } from '../models/userBadgeModel.js';
import { deletePasswordResetTokensByUser } from '../models/passwordResetTokenModel.js';
import { findByIdWithPassword, deleteUser } from '../models/userModel.js';
import { createError } from '../utils/errors.js';

// Supprime toutes les donnees de progression liees a un utilisateur
async function deleteAllProgressData(userId) {
  await deleteUserBadges(userId);
  await deletePlayerResources(userId);
  await deletePlayerFactories(userId);
  await deletePlayerRealms(userId);
  await deletePlayerSkills(userId);
  await deletePlayerState(userId);
  await deletePlayerStats(userId);
  await deletePlayerSessions(userId);
}

// Reinitialise la progression du joueur apres verification du mot de passe
export async function resetProgress(userId, password) {
  try {
    const user = await findByIdWithPassword(userId);
    if (!user) {
      throw createError({
        code: 'USER_NOT_FOUND',
        message: 'Compte introuvable.',
        status: 404
      });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      throw createError({
        code: 'INVALID_CREDENTIALS',
        message: 'Mot de passe incorrect.',
        status: 401
      });
    }

    await deleteAllProgressData(userId);
    await bootstrapNewPlayer(userId);

    return { status: 'ok' };
  } catch (error) {
    console.error(error);
    if (error && error.code) {
      throw error;
    }
    throw createError({
      code: 'RESET_PROGRESS_FAILED',
      message: 'Impossible de reinitialiser la progression.',
      status: 500
    });
  }
}

// Supprime definitivement le compte apres verification du mot de passe
export async function deleteAccount(userId, password) {
  try {
    const user = await findByIdWithPassword(userId);
    if (!user) {
      throw createError({
        code: 'USER_NOT_FOUND',
        message: 'Compte introuvable.',
        status: 404
      });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      throw createError({
        code: 'INVALID_CREDENTIALS',
        message: 'Mot de passe incorrect.',
        status: 401
      });
    }

    await deletePasswordResetTokensByUser(userId);
    await deleteAllProgressData(userId);
    await deleteUser(userId);

    return { status: 'ok' };
  } catch (error) {
    console.error(error);
    if (error && error.code) {
      throw error;
    }
    throw createError({
      code: 'DELETE_ACCOUNT_FAILED',
      message: 'Impossible de supprimer le compte.',
      status: 500
    });
  }
}
