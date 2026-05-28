import adminApiClient from '../../../utils/apiClient';
import type { ILeaderboardData } from '../../../types';

export const fetchLeaderboard = async (filters: { page?: number; limit?: number; timeFilter?: string }) => {
  const params = new URLSearchParams();
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));
  if (filters.timeFilter) params.append('timeFilter', filters.timeFilter);
  const response = await adminApiClient.get(`/leaderboard?${params.toString()}`);
  return response.data.data as ILeaderboardData;
};
