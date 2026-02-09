import api from './api.js';
import { buildApiError } from '../utils/apiError.js';

export async function getGameSnapshot() {
  try {
    const response = await api.get('/game/snapshot');
    return response.data;
  } catch (error) {
    console.error(error);
    throw buildApiError(error, 'Impossible de charger le jeu.');
  }
}

export async function idleTick() {
  try {
    const response = await api.post('/game/idle-tick');
    return response.data;
  } catch (error) {
    console.error(error);
    throw buildApiError(error, 'Impossible de calculer le hors-ligne.');
  }
}

export async function upgradeFactory(factoryId) {
  try {
    const response = await api.post(`/game/factories/${factoryId}/upgrade`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw buildApiError(error, 'Impossible d’améliorer l’usine.');
  }
}

export async function unlockRealm(realmId) {
  try {
    const response = await api.post(`/game/realms/${realmId}/unlock`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw buildApiError(error, 'Impossible de débloquer le royaume.');
  }
}

export async function upgradeSkill(skillId) {
  try {
    const response = await api.post(`/game/skills/${skillId}/upgrade`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw buildApiError(error, 'Impossible d’améliorer la compétence.');
  }
}
