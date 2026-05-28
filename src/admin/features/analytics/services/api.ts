import adminApiClient from '../../../utils/apiClient';
import type { IAnalyticsData } from '../../../types';

export const fetchAnalytics = async (period = '30d'): Promise<IAnalyticsData> => {
  const response = await adminApiClient.get(`/analytics?period=${period}`);
  return response.data.data || response.data;
};
