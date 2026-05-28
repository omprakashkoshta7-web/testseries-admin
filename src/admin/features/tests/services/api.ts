import adminApiClient from '../../../utils/apiClient';
import type { ITest, ITestFilter, ITestForm } from '../../../types';

export const fetchAdminTests = async (filters: ITestFilter) => {
  const params = new URLSearchParams();
  if (filters.search) params.append('search', filters.search);
  if (filters.category) params.append('category', filters.category);
  if (filters.testType) params.append('testType', filters.testType);
  if (filters.status) params.append('status', filters.status);
  if (filters.difficulty) params.append('difficulty', filters.difficulty);
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));
  const response = await adminApiClient.get(`/tests?${params.toString()}`);
  return response.data.data || response.data;
};

export const bulkCreateTests = async (tests: ITestForm[]): Promise<{ tests: ITest[]; count: number }> => {
  const response = await adminApiClient.post('/tests/bulk', { tests });
  return response.data.data || response.data;
};

export const createTest = async (data: ITestForm): Promise<ITest> => {
  const response = await adminApiClient.post('/tests', data);
  return response.data.data || response.data;
};

export const updateTest = async (id: string, data: Partial<ITestForm>): Promise<ITest> => {
  const response = await adminApiClient.patch(`/tests/${id}`, data);
  return response.data.data || response.data;
};

export const deleteTest = async (id: string): Promise<string> => {
  await adminApiClient.delete(`/tests/${id}`);
  return id;
};

export const duplicateTest = async (id: string): Promise<ITest> => {
  const response = await adminApiClient.post(`/tests/${id}/duplicate`);
  return response.data.data || response.data;
};
