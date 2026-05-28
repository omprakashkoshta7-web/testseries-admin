import adminApiClient from '../../../utils/apiClient';
import type { IFaq, IFaqForm } from '../../../types';

export const fetchFaqs = async (): Promise<IFaq[]> => {
  const response = await adminApiClient.get('/faqs');
  return response.data.data.faqs;
};

export const createFaq = async (data: IFaqForm): Promise<IFaq> => {
  const response = await adminApiClient.post('/faqs', data);
  return response.data.data;
};

export const updateFaq = async (id: string, data: Partial<IFaqForm>): Promise<IFaq> => {
  const response = await adminApiClient.patch(`/faqs/${id}`, data);
  return response.data.data;
};

export const deleteFaq = async (id: string): Promise<string> => {
  await adminApiClient.delete(`/faqs/${id}`);
  return id;
};
