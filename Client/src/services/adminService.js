import api from './api.js';

export async function getAdminTables() {
  try {
    const response = await api.get('/admin/tables');
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || 'API error');
  }
}

export async function getAdminTableSchema(table) {
  try {
    const response = await api.get(`/admin/${table}/schema`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || 'API error');
  }
}

export async function listAdminRows(table, limit = 50, offset = 0) {
  try {
    const response = await api.get(`/admin/${table}?limit=${limit}&offset=${offset}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || 'API error');
  }
}

export async function createAdminRow(table, data) {
  try {
    const response = await api.post(`/admin/${table}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || 'API error');
  }
}

export async function updateAdminRow(table, id, data) {
  try {
    const response = await api.put(`/admin/${table}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || 'API error');
  }
}

export async function deleteAdminRow(table, id) {
  try {
    const response = await api.delete(`/admin/${table}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.message || 'API error');
  }
}
