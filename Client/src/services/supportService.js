import api from './api.js';
import { buildApiError } from '../utils/apiError.js';

export async function createSupportTicket(payload) {
  try {
    const response = await api.post('/support-tickets', payload);
    return response.data;
  } catch (error) {
    console.error(error);
    throw buildApiError(error, 'Impossible d’envoyer la demande de support.');
  }
}
