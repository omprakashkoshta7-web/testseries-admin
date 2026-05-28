import adminApiClient from '../../../utils/apiClient';
import type { IAnnouncement, IAnnouncementForm } from '../../../types';

export const fetchAnnouncements = async (): Promise<IAnnouncement[]> => {
  const response = await adminApiClient.get('/announcements');
  return response.data.data.announcements;
};

export const createAnnouncement = async (data: IAnnouncementForm): Promise<IAnnouncement> => {
  const response = await adminApiClient.post('/announcements', data);
  return response.data.data;
};

export const updateAnnouncement = async (id: string, data: IAnnouncementForm): Promise<IAnnouncement> => {
  const response = await adminApiClient.patch(`/announcements/${id}`, data);
  return response.data.data;
};

export const deleteAnnouncement = async (id: string): Promise<string> => {
  await adminApiClient.delete(`/announcements/${id}`);
  return id;
};
