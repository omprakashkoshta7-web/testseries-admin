import adminApiClient from '../../../utils/apiClient';
import type { IActivityLog } from '../../../types';

export const fetchActivityLogs = async (filters: { page?: number; limit?: number }) => {
  const params = new URLSearchParams();
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));
  const response = await adminApiClient.get(`/activity-logs?${params.toString()}`);
  return response.data.data;
};
