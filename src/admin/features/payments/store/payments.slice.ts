import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IPayment, IPaymentsState, IPaymentFilter } from '../../../types';
import {
  fetchAdminPayments as fetchAdminPaymentsApi,
  refundPayment as refundPaymentApi,
} from '../services/api';

const initialState: IPaymentsState = {
  payments: [],
  totalRevenue: 0,
  activePlans: 0,
  pendingAmount: 0,
  refundedAmount: 0,
  totalPages: 1,
  currentPage: 1,
  loading: false,
  error: null,
};

export const fetchAdminPayments = createAsyncThunk<
  {
    payments: IPayment[];
    totalRevenue: number;
    activePlans: number;
    pendingAmount: number;
    refundedAmount: number;
    totalPages: number;
    currentPage: number;
  },
  IPaymentFilter
>('payments/fetchAdminPayments', async (filters, { rejectWithValue }) => {
  try {
    return await fetchAdminPaymentsApi(filters);
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || 'Failed to fetch payments';
    return rejectWithValue(message);
  }
});

export const refundPayment = createAsyncThunk<IPayment, string>(
  'payments/refundPayment',
  async (id, { rejectWithValue }) => {
    try {
      return await refundPaymentApi(id);
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Failed to refund payment';
      return rejectWithValue(message);
    }
  }
);

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload.payments;
        state.totalRevenue = action.payload.totalRevenue;
        state.activePlans = action.payload.activePlans;
        state.pendingAmount = action.payload.pendingAmount;
        state.refundedAmount = action.payload.refundedAmount;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchAdminPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(refundPayment.fulfilled, (state, action) => {
        const idx = state.payments.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) state.payments[idx] = action.payload;
      });
  },
});

export default paymentsSlice.reducer;
