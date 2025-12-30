import api from './api.js';

export async function getGameSnapshot() {
  try {
    const response = await api.get('/game/snapshot');
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || 'API error');
  }
}

export async function idleTick() {
  try {
    const response = await api.post('/game/idle-tick');
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || 'API error');
  }
}

export async function upgradeFactory(factoryId) {
  try {
    const response = await api.post(`/game/factories/${factoryId}/upgrade`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || 'API error');
  }
}

export async function unlockRealm(realmId) {
  try {
    const response = await api.post(`/game/realms/${realmId}/unlock`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || 'API error');
  }
}

export async function upgradeSkill(skillId) {
  try {
    const response = await api.post(`/game/skills/${skillId}/upgrade`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || 'API error');
  }
}



