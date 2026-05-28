import adminApiClient from '../../../utils/apiClient';
import type { IAccessRule } from '../../../types';

export const fetchAccessRules = async (params: any): Promise<IAccessRule[]> => {
  const { data } = await adminApiClient.get('/access-rules', { params });
  return data.data;
};

export const createAccessRule = async (form: Partial<IAccessRule>): Promise<IAccessRule> => {
  const { data } = await adminApiClient.post('/access-rules', form);
  return data.data;
};

export const updateAccessRule = async ({ id, form }: { id: string; form: Partial<IAccessRule> }): Promise<IAccessRule> => {
  const { data } = await adminApiClient.patch(`/access-rules/${id}`, form);
  return data.data;
};

export const deleteAccessRule = async (id: string): Promise<string> => {
  await adminApiClient.delete(`/access-rules/${id}`);
  return id;
};
