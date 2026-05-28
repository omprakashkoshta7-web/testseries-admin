export interface ITicket {
  id: string;
  _id?: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  description: string;
  category: 'technical' | 'payment' | 'content' | 'general' | 'doubt';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  messageCount: number;
  assignedTo?: string;
  messages?: ITicketMessage[];
  feedback?: { rating: number; comment: string };
  createdAt: string;
  updatedAt?: string;
}

export interface ITicketMessage {
  sender: 'user' | 'admin';
  message: string;
  attachments: string[];
  createdAt: string;
}

export interface ITicketDetail {
  id: string;
  _id?: string;
  userId: { _id: string; name: string; email: string };
  userName: string;
  userEmail: string;
  subject: string;
  description: string;
  category: 'technical' | 'payment' | 'content' | 'general' | 'doubt';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  messageCount: number;
  assignedTo?: { _id: string; name: string };
  messages: ITicketMessage[];
  feedback?: { rating: number; comment: string };
  createdAt: string;
  updatedAt?: string;
}

export interface ITicketsState {
  tickets: ITicket[];
  ticketDetail: ITicketDetail | null;
  totalPages: number;
  currentPage: number;
  totalTickets: number;
  loading: boolean;
  error: string | null;
}

export interface ITicketFilter {
  status?: string;
  page?: number;
  limit?: number;
}
