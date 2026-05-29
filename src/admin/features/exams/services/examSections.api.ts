import adminApiClient from '../../../utils/apiClient';
import type { IExamSection } from '../../../types';

export const fetchAdminExamSectionsApi = async (categoryId?: string) => {
  const params = categoryId ? { categoryId } : {};
  const { data } = await adminApiClient.get('/exam-sections', { params });
  return data.data as IExamSection[];
};

export const createAdminExamSectionApi = async (form: Partial<IExamSection>) => {
  const { data } = await adminApiClient.post('/exam-sections', form);
  return data.data;
};

export const updateAdminExamSectionApi = async (id: string, form: Partial<IExamSection>) => {
  const { data } = await adminApiClient.patch(`/exam-sections/${id}`, form);
  return data.data;
};

export const deleteAdminExamSectionApi = async (id: string) => {
  await adminApiClient.delete(`/exam-sections/${id}`);
  return id;
};
