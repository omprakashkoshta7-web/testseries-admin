import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { ITicket, ITicketDetail, ITicketsState, ITicketFilter } from '../../../types';
import {
  fetchTickets as fetchTicketsApi,
  fetchTicketDetail as fetchTicketDetailApi,
  updateTicket as updateTicketApi,
  replyTicket as replyTicketApi,
} from '../services/api';

const initialState: ITicketsState = {
  tickets: [],
  ticketDetail: null,
  totalPages: 1,
  currentPage: 1,
  totalTickets: 0,
  loading: false,
  error: null,
};

export const fetchTickets = createAsyncThunk<
  { tickets: ITicket[]; totalPages: number; currentPage: number; totalTickets: number },
  ITicketFilter
>('tickets/fetchTickets', async (filters, { rejectWithValue }) => {
  try {
    return await fetchTicketsApi(filters);
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to fetch tickets');
  }
});

export const fetchTicketDetail = createAsyncThunk<ITicketDetail, string>(
  'tickets/fetchTicketDetail',
  async (id, { rejectWithValue }) => {
    try {
      return await fetchTicketDetailApi(id);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to fetch ticket');
    }
  }
);

export const updateTicket = createAsyncThunk<ITicket, { id: string; data: { status?: string; assignedTo?: string; priority?: string } }>(
  'tickets/updateTicket',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateTicketApi(id, data);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to update ticket');
    }
  }
);

export const replyTicket = createAsyncThunk<ITicket, { id: string; message: string }>(
  'tickets/replyTicket',
  async ({ id, message }, { rejectWithValue }) => {
    try {
      return await replyTicketApi(id, message);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to reply');
    }
  }
);

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    clearTicketDetail(state) {
      state.ticketDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload.tickets;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalTickets = action.payload.totalTickets;
      })
      .addCase(fetchTickets.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(fetchTicketDetail.pending, (state) => { state.loading = true; })
      .addCase(fetchTicketDetail.fulfilled, (state, action) => { state.loading = false; state.ticketDetail = action.payload; })
      .addCase(fetchTicketDetail.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(updateTicket.fulfilled, (state, action) => {
        const idx = state.tickets.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) state.tickets[idx] = action.payload;
      })
      .addCase(replyTicket.fulfilled, (state, action) => {
        if (state.ticketDetail && action.payload.id === state.ticketDetail.id) {
          // @ts-ignore
          state.ticketDetail = action.payload;
        }
      });
  },
});

export const { clearTicketDetail } = ticketsSlice.actions;
export default ticketsSlice.reducer;
