import adminApiClient from '../../../utils/apiClient';
import type { IAdminDashboardStats } from '../../../types';

export const fetchDashboard = async (): Promise<IAdminDashboardStats> => {
  const response = await adminApiClient.get('/dashboard');
  return response.data.data || response.data;
};
