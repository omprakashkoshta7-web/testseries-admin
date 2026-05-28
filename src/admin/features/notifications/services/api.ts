import adminApiClient from '../../../utils/apiClient';
import type { INotification, INotificationForm } from '../../../types';

export const fetchNotifications = async (filters: { page?: number; limit?: number }) => {
  const params = new URLSearchParams();
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));
  const response = await adminApiClient.get(`/notifications?${params.toString()}`);
  return response.data.data;
};

export const createNotification = async (data: INotificationForm): Promise<INotification> => {
  const response = await adminApiClient.post('/notifications', data);
  return response.data.data;
};

export const sendNotification = async (id: string): Promise<INotification> => {
  const response = await adminApiClient.post(`/notifications/${id}/send`);
  return response.data.data;
};

export const updateNotification = async (id: string, data: Partial<INotificationForm>): Promise<INotification> => {
  const response = await adminApiClient.patch(`/notifications/${id}`, data);
  return response.data.data;
};

export const deleteNotification = async (id: string): Promise<void> => {
  await adminApiClient.delete(`/notifications/${id}`);
};
