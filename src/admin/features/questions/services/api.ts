import adminApiClient from '../../../utils/apiClient';
import type { IQuestion, IQuestionFilter } from '../../../types';

export const fetchQuestions = async (filters: IQuestionFilter) => {
  const params = new URLSearchParams();
  if (filters.search) params.append('search', filters.search);
  if (filters.category) params.append('category', filters.category);
  if (filters.subject) params.append('subject', filters.subject);
  if (filters.type) params.append('type', filters.type);
  if (filters.topic) params.append('topic', filters.topic);
  if (filters.testId) params.append('testId', filters.testId);
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));
  const response = await adminApiClient.get(`/questions?${params.toString()}`);
  return response.data.data;
};

export const createQuestion = async (data: Partial<IQuestion>) => {
  const response = await adminApiClient.post('/questions', data);
  return response.data.data;
};

export const updateQuestion = async (id: string, data: Partial<IQuestion>) => {
  const response = await adminApiClient.patch(`/questions/${id}`, data);
  return response.data.data;
};

export const deleteQuestion = async (id: string): Promise<string> => {
  await adminApiClient.delete(`/questions/${id}`);
  return id;
};

export const deleteQuestionsByTest = async (testId: string): Promise<{ testId: string; count: number }> => {
  const response = await adminApiClient.delete(`/questions/by-test/${testId}`);
  return response.data.data || response.data;
};

export const bulkUploadQuestions = async (questions: any[]) => {
  const response = await adminApiClient.post('/questions/bulk', { questions });
  return response.data.data;
};
