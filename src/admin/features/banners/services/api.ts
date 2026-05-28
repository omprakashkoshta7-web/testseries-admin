import adminApiClient from '../../../utils/apiClient';
import type { IBanner, IBannerForm } from '../../../types';

export const fetchBanners = async (): Promise<IBanner[]> => {
  const response = await adminApiClient.get('/banners');
  return response.data.data.banners;
};

export const createBanner = async (data: IBannerForm): Promise<IBanner> => {
  const response = await adminApiClient.post('/banners', data);
  return response.data.data;
};

export const updateBanner = async (id: string, data: Partial<IBannerForm>): Promise<IBanner> => {
  const response = await adminApiClient.patch(`/banners/${id}`, data);
  return response.data.data;
};

export const deleteBanner = async (id: string): Promise<string> => {
  await adminApiClient.delete(`/banners/${id}`);
  return id;
};
