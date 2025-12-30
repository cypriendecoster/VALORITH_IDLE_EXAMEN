import api from './api.js';

export async function createSupportTicket(payload) {
  try {
    const response = await api.post('/support-tickets', payload);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || 'Support ticket failed');
  }
}
