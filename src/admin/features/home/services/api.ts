import adminApiClient from '../../../utils/apiClient';
import type { IHomeContent, IHomeContentForm } from '../../../types';

export const fetchHomeContents = async (): Promise<IHomeContent[]> => {
  const response = await adminApiClient.get('/home-content');
  return response.data.data;
};

export const createHomeContent = async (data: IHomeContentForm): Promise<IHomeContent> => {
  const response = await adminApiClient.post('/home-content', data);
  return response.data.data;
};

export const updateHomeContent = async (id: string, data: Partial<IHomeContentForm>): Promise<IHomeContent> => {
  const response = await adminApiClient.patch(`/home-content/${id}`, data);
  return response.data.data;
};

export const deleteHomeContent = async (id: string): Promise<string> => {
  await adminApiClient.delete(`/home-content/${id}`);
  return id;
};
