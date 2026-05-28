import adminApiClient from '../../../utils/apiClient';
import type { IReviewItem } from '../../../types';

export const fetchReviewsApi = async (params?: any): Promise<IReviewItem[]> => {
  const { data } = await adminApiClient.get('/reviews', { params });
  return data.data;
};

export const createReviewApi = async (form: Partial<IReviewItem>): Promise<IReviewItem> => {
  const { data } = await adminApiClient.post('/reviews', form);
  return data.data;
};

export const updateReviewStatusApi = async ({ id, status, comments }: { id: string; status: string; comments?: string }): Promise<IReviewItem> => {
  const { data } = await adminApiClient.patch(`/reviews/${id}/status`, { status, comments });
  return data.data;
};

export const deleteReviewApi = async (id: string): Promise<string> => {
  await adminApiClient.delete(`/reviews/${id}`);
  return id;
};
