import adminApiClient from '../../../utils/apiClient';
import type { IPayment, IPaymentFilter } from '../../../types';

export const fetchAdminPayments = async (filters: IPaymentFilter) => {
  const params = new URLSearchParams();
  if (filters.status) params.append('status', filters.status);
  if (filters.plan) params.append('plan', filters.plan);
  if (filters.search) params.append('search', filters.search);
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));
  const response = await adminApiClient.get(`/payments?${params.toString()}`);
  return response.data.data || response.data;
};

export const refundPayment = async (id: string): Promise<IPayment> => {
  const response = await adminApiClient.post(`/payments/${id}/refund`);
  return response.data.data || response.data;
};
