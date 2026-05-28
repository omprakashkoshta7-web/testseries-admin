import adminApiClient from '../../../utils/apiClient';
import type { IAdminSubject } from '../../../types';

export const fetchAdminSubjectsApi = async () => {
  const { data } = await adminApiClient.get('/subjects');
  return data.data;
};

export const createAdminSubjectApi = async (form: Partial<IAdminSubject>) => {
  const { data } = await adminApiClient.post('/subjects', form);
  return data.data;
};

export const updateAdminSubjectApi = async ({ id, form }: { id: string; form: Partial<IAdminSubject> }) => {
  const { data } = await adminApiClient.patch(`/subjects/${id}`, form);
  return data.data;
};

export const deleteAdminSubjectApi = async (id: string) => {
  await adminApiClient.delete(`/subjects/${id}`);
  return id;
};
