import api from './api.js';
import { buildApiError } from '../utils/apiError.js';

export async function getEndgameRanking(limit = 50) {
  try {
    const response = await api.get(`/rankings/endgame?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw buildApiError(error, 'Impossible de charger le classement.');
  }
}
