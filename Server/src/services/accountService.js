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

export async function resetProgress(userId, password) {
  try {
    const user = await findByIdWithPassword(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      throw new Error('Invalid credentials');
    }

    await deleteAllProgressData(userId);
    await bootstrapNewPlayer(userId);

    return { status: 'ok' };
  } catch (error) {
    console.error(error);
    throw new Error(error.message || 'Reset progress failed');
  }
}

export async function deleteAccount(userId, password) {
  try {
    const user = await findByIdWithPassword(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      throw new Error('Invalid credentials');
    }

    await deletePasswordResetTokensByUser(userId);
    await deleteAllProgressData(userId);
    await deleteUser(userId);

    return { status: 'ok' };
  } catch (error) {
    console.error(error);
    throw new Error(error.message || 'Delete account failed');
  }
}
