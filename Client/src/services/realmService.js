import api from './api.js';
import { buildApiError } from '../utils/apiError.js';

export async function getRealms() {
  try {
    const response = await api.get('/realms');
    return response.data;
  } catch (error) {
    console.error(error);
    throw buildApiError(error, 'Impossible de charger les royaumes.');
  }
}

export async function getRealmUnlockCosts() {
  try {
    const response = await api.get('/realm-unlock-costs');
    return response.data;
  } catch (error) {
    console.error(error);
    throw buildApiError(error, 'Impossible de charger les coûts de déblocage.');
  }
}

export async function activateRealm(realmId) {
  try {
    const response = await api.post(`/player/realms/${realmId}/activate`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw buildApiError(error, 'Impossible d’activer le royaume.');
  }
}
