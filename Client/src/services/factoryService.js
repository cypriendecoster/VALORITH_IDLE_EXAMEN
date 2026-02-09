import api from './api.js';
import { buildApiError } from '../utils/apiError.js';

export async function getFactories() {
  try {
    const response = await api.get('/factories');
    return response.data;
  } catch (error) {
    console.error(error);
    throw buildApiError(error, 'Impossible de charger les usines.');
  }
}

export async function getFactoriesByRealm(realmId) {
  try {
    const response = await api.get(`/factories/realm/${realmId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw buildApiError(error, 'Impossible de charger les usines.');
  }
}
