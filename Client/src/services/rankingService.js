import api from './api.js';

export async function getEndgameRanking(limit = 50) {
  try {
    const response = await api.get(`/rankings/endgame?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || 'API error');
  }
}

export async function getResourceRanking(limit = 50) {
  try {
    const response = await api.get(`/rankings/resources?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || 'API error');
  }
}
