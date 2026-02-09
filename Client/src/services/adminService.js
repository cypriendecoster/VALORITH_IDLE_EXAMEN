import api from './api.js';
import { buildApiError } from '../utils/apiError.js';

export async function getAdminTables() {
  try {
    const response = await api.get('/admin/tables');
    return response.data;
  } catch (error) {
    console.error(error);
    throw buildApiError(error, 'Impossible de charger les tables admin.');
  }
}

export async function getAdminTableSchema(table) {
  try {
    const response = await api.get(`/admin/${table}/schema`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw buildApiError(error, 'Impossible de charger le schéma.');
  }
}

export async function listAdminRows(table) {
  try {
    const response = await api.get(`/admin/${table}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw buildApiError(error, 'Impossible de charger les enregistrements.');
  }
}

export async function createAdminRow(table, data) {
  try {
    const response = await api.post(`/admin/${table}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw buildApiError(error, 'Impossible de créer l’enregistrement.');
  }
}

export async function updateAdminRow(table, id, data) {
  try {
    const response = await api.put(`/admin/${table}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw buildApiError(error, 'Impossible de modifier l’enregistrement.');
  }
}

export async function deleteAdminRow(table, id) {
  try {
    const response = await api.delete(`/admin/${table}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw buildApiError(error, 'Impossible de supprimer l’enregistrement.');
  }
}
