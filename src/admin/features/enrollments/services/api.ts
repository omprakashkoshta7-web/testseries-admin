import adminApiClient from '../../../utils/apiClient';
import type { IEnrollmentsData } from '../../../types';

export const fetchEnrollments = async (page = 1, limit = 50): Promise<IEnrollmentsData> => {
  const response = await adminApiClient.get('/enrollments', { params: { page, limit } });
  return response.data.data;
};
