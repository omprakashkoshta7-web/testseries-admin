import adminApiClient from '../../../utils/apiClient';
import type { IUser, IUserFilter } from '../../../types';

export const fetchUsers = async (filters: IUserFilter) => {
  const params = new URLSearchParams();
  if (filters.search) params.append('search', filters.search);
  if (filters.status) params.append('status', filters.status);
  if (filters.role) params.append('role', filters.role);
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));
  const response = await adminApiClient.get(`/users?${params.toString()}`);
  return response.data.data || response.data;
};

export const deleteUser = async (id: string) => {
  await adminApiClient.delete(`/users/${id}`);
  return id;
};

export const updateUserStatus = async (id: string, status: string) => {
  const response = await adminApiClient.patch(`/users/${id}/status`, { status });
  return response.data.data || response.data;
};

export const fetchUserDetails = async (id: string) => {
  const response = await adminApiClient.get(`/users/${id}`);
  return response.data.data || response.data;
};

export const createUser = async (data: { name: string; email: string; password: string; phone?: string; role?: string }) => {
  const response = await adminApiClient.post('/users', data);
  return response.data.data || response.data;
};
