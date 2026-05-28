import adminApiClient from '../../../utils/apiClient';
import type { IAdminExam } from '../../../types';

export const fetchAdminExamsApi = async (params?: any) => {
  const { data } = await adminApiClient.get('/exams', { params });
  return data.data;
};

export const createAdminExamApi = async (form: Partial<IAdminExam>) => {
  const { data } = await adminApiClient.post('/exams', form);
  return data.data;
};

export const updateAdminExamApi = async (id: string, form: Partial<IAdminExam>) => {
  const { data } = await adminApiClient.patch(`/exams/${id}`, form);
  return data.data;
};

export const deleteAdminExamApi = async (id: string) => {
  await adminApiClient.delete(`/exams/${id}`);
  return id;
};
