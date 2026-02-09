import { getPlayerStats } from '../models/playerStatsModel.js';
import { findById } from '../models/userModel.js';
import { resetProgress, deleteAccount } from '../services/accountService.js';
import { toResponseError } from '../utils/errors.js';

export async function meController(req, res) {
  try {
    const userId = req.user.id;
    const [stats, user] = await Promise.all([
      getPlayerStats(userId),
      findById(userId)
    ]);

    return res.status(200).json({
      id: userId,
      email: user?.email || null,
      username: user?.username || null,
      role: user?.role || req.user.role || null,
      last_login_at: user?.last_login_at || null,
      stats
    });
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(error, 'Impossible de charger le profil.', 'USER_PROFILE_FETCH_FAILED');
    return res.status(status).json({ message, code });
  }
}

export async function resetProgressController(req, res) {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({
        message: 'Mot de passe requis.',
        code: 'PASSWORD_MISSING'
      });
    }

    const result = await resetProgress(req.user.id, password);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(
      error,
      'Impossible de réinitialiser la progression.',
      'RESET_PROGRESS_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}

export async function deleteAccountController(req, res) {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({
        message: 'Mot de passe requis.',
        code: 'PASSWORD_MISSING'
      });
    }

    const result = await deleteAccount(req.user.id, password);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(
      error,
      'Impossible de supprimer le compte.',
      'DELETE_ACCOUNT_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}
