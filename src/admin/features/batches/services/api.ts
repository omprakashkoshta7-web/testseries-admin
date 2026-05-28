import adminApiClient from '../../../utils/apiClient';
import type { IBatch, IGroup, IBatchForm, IGroupForm } from '../../../types';

export const fetchBatches = async () => {
  const response = await adminApiClient.get('/batches');
  return response.data.data;
};

export const createBatch = async (data: IBatchForm) => {
  const response = await adminApiClient.post('/batches', data);
  return response.data.data;
};

export const updateBatch = async (id: string, data: Partial<IBatchForm>) => {
  const response = await adminApiClient.patch(`/batches/${id}`, data);
  return response.data.data;
};

export const deleteBatch = async (id: string): Promise<string> => {
  await adminApiClient.delete(`/batches/${id}`);
  return id;
};

export const fetchGroups = async () => {
  const response = await adminApiClient.get('/groups');
  return response.data.data;
};

export const createGroup = async (data: IGroupForm) => {
  const response = await adminApiClient.post('/groups', data);
  return response.data.data;
};

export const deleteGroup = async (id: string): Promise<string> => {
  await adminApiClient.delete(`/groups/${id}`);
  return id;
};
