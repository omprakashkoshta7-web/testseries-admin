import adminApiClient from '../../../utils/apiClient';
import type { IExamCategory } from '../../../types';

export const fetchExamCategories = async (): Promise<IExamCategory[]> => {
  const { data } = await adminApiClient.get('/exam-categories');
  return data.data;
};

export const createExamCategory = async (form: Partial<IExamCategory>): Promise<IExamCategory> => {
  const { data } = await adminApiClient.post('/exam-categories', form);
  return data.data;
};

export const updateExamCategory = async ({ id, form }: { id: string; form: Partial<IExamCategory> }): Promise<IExamCategory> => {
  const { data } = await adminApiClient.patch(`/exam-categories/${id}`, form);
  return data.data;
};

export const deleteExamCategory = async (id: string): Promise<string> => {
  await adminApiClient.delete(`/exam-categories/${id}`);
  return id;
};
