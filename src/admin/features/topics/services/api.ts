import adminApiClient from '../../../utils/apiClient';
import type { ITopic } from '../../../types';

export const fetchTopicsApi = async (params?: any) => {
  const { data } = await adminApiClient.get('/topics', { params });
  return data.data as ITopic[];
};

export const createTopicApi = async (form: Partial<ITopic>) => {
  const { data } = await adminApiClient.post('/topics', form);
  return data.data as ITopic;
};

export const updateTopicApi = async ({ id, form }: { id: string; form: Partial<ITopic> }) => {
  const { data } = await adminApiClient.patch(`/topics/${id}`, form);
  return data.data as ITopic;
};

export const deleteTopicApi = async (id: string) => {
  await adminApiClient.delete(`/topics/${id}`);
  return id;
};
