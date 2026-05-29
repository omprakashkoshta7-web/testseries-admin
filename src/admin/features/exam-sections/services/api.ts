import adminApiClient from '../../../utils/apiClient';
import type { IExamSection } from '../../../types';

export const fetchSectionsApi = async (params?: any) => {
  const { data } = await adminApiClient.get('/exam-sections', { params });
  return data.data as IExamSection[];
};

export const createSectionApi = async (form: Partial<IExamSection>) => {
  const { data } = await adminApiClient.post('/exam-sections', form);
  return data.data;
};

export const updateSectionApi = async (id: string, form: Partial<IExamSection>) => {
  const { data } = await adminApiClient.patch(`/exam-sections/${id}`, form);
  return data.data;
};

export const deleteSectionApi = async (id: string) => {
  await adminApiClient.delete(`/exam-sections/${id}`);
  return id;
};
