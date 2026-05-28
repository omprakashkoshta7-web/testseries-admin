import adminApiClient from '../../../utils/apiClient';
import type { IAdminPlan } from '../../../types';

export const fetchAdminPlansApi = async (): Promise<IAdminPlan[]> => {
  const response = await adminApiClient.get('/plans');
  return response.data.data;
};

export const createAdminPlanApi = async (data: Partial<IAdminPlan>): Promise<IAdminPlan> => {
  const response = await adminApiClient.post('/plans', data);
  return response.data.data;
};

export const updateAdminPlanApi = async (id: string, data: Partial<IAdminPlan>): Promise<IAdminPlan> => {
  const response = await adminApiClient.patch(`/plans/${id}`, data);
  return response.data.data;
};

export const deleteAdminPlanApi = async (id: string): Promise<string> => {
  await adminApiClient.delete(`/plans/${id}`);
  return id;
};
