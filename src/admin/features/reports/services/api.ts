import adminApiClient from '../../../utils/apiClient';

export const fetchResults = async (filters: { testId?: string; page?: number; limit?: number }) => {
  const params = new URLSearchParams();
  if (filters.testId) params.append('testId', filters.testId);
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));
  const response = await adminApiClient.get(`/results?${params.toString()}`);
  return response.data.data;
};

export const generateRanks = async (testId: string) => {
  const response = await adminApiClient.post(`/results/${testId}/ranks`);
  return response.data.data;
};

export const fetchRevenueReport = async (period: string) => {
  const response = await adminApiClient.get(`/reports/revenue?period=${period}`);
  return response.data.data;
};

export const fetchAttemptReport = async (testId?: string) => {
  const params = testId ? `?testId=${testId}` : '';
  const response = await adminApiClient.get(`/reports/attempts${params}`);
  return response.data.data;
};

export const downloadReportCsv = async (type: string) => {
  const response = await adminApiClient.get(`/reports/export/${type}`, { responseType: 'blob' });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const a = document.createElement('a');
  a.href = url;
  a.download = `${type}-report.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
};
