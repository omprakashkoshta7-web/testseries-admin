export interface IPayment {
  id: string;
  transactionId: string;
  userId: string;
  userName: string;
  userEmail: string;
  plan: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPaymentsState {
  payments: IPayment[];
  totalRevenue: number;
  activePlans: number;
  pendingAmount: number;
  refundedAmount: number;
  totalPages: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
}

export interface IPaymentFilter {
  status?: string;
  plan?: string;
  search?: string;
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
}
