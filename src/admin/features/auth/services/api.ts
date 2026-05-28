import adminApiClient from '../../../utils/apiClient';
import type { ILoginPayload, ILoginResponse } from '../../../types';

export const login = async (payload: ILoginPayload): Promise<ILoginResponse> => {
  const response = await adminApiClient.post('/auth/admin-login', payload);
  const data: ILoginResponse = response.data.data || response.data;
  localStorage.setItem('adminToken', data.token);
  localStorage.setItem('adminUser', JSON.stringify(data.user));
  return data;
};
