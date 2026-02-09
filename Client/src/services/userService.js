import api from './api.js';
import { buildApiError } from '../utils/apiError.js';

export async function getMe() {
  try {
    const response = await api.get('/users/me');
    return response.data;
  } catch (error) {
    console.error(error);
    throw buildApiError(error, 'Impossible de charger le profil.');
  }
}

export async function resetProgress(password) {
  try {
    const response = await api.post('/users/reset-progress', { password });
    return response.data;
  } catch (error) {
    console.error(error);
    throw buildApiError(error, 'Impossible de réinitialiser la progression.');
  }
}

export async function deleteAccount(password) {
  try {
    const response = await api.delete('/users/me', { data: { password } });
    return response.data;
  } catch (error) {
    console.error(error);
    throw buildApiError(error, 'Impossible de supprimer le compte.');
  }
}
