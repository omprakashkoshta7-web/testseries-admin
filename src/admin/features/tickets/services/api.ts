import adminApiClient from '../../../utils/apiClient';
import type { ITicket, ITicketDetail, ITicketFilter } from '../../../types';

const normalizeTicket = <T extends { id?: string; _id?: string }>(ticket: T): T => ({
  ...ticket,
  id: ticket.id || ticket._id,
});

export const fetchTickets = async (filters: ITicketFilter) => {
  const params = new URLSearchParams();
  if (filters.status) params.append('status', filters.status);
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));
  const response = await adminApiClient.get(`/tickets?${params.toString()}`);
  return response.data.data;
};

export const fetchTicketDetail = async (id: string): Promise<ITicketDetail> => {
  const response = await adminApiClient.get(`/tickets/${id}`);
  return normalizeTicket(response.data.data);
};

export const updateTicket = async (id: string, data: { status?: string; assignedTo?: string; priority?: string }) => {
  const response = await adminApiClient.patch(`/tickets/${id}`, data);
  return normalizeTicket(response.data.data);
};

export const replyTicket = async (id: string, message: string) => {
  const response = await adminApiClient.post(`/tickets/${id}/reply`, { message });
  return normalizeTicket(response.data.data);
};
