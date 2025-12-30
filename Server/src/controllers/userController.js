import { getPlayerStats } from '../models/playerStatsModel.js';
import { findById } from '../models/userModel.js';
import { resetProgress, deleteAccount } from '../services/accountService.js';

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
      stats
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message || 'Internal server error'
    });
  }
}


export async function resetProgressController(req, res) {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: 'Missing password' });
    }

    const result = await resetProgress(req.user.id, password);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    const status = error.message === 'Invalid credentials' ? 401 : 500;
    return res.status(status).json({ message: error.message || 'Internal server error' });
  }
}

export async function deleteAccountController(req, res) {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: 'Missing password' });
    }

    const result = await deleteAccount(req.user.id, password);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    const status = error.message === 'Invalid credentials' ? 401 : 500;
    return res.status(status).json({ message: error.message || 'Internal server error' });
  }
}

