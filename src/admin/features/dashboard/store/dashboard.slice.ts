import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { IAdminDashboardStats } from '../../../types';
import { fetchDashboard as fetchDashboardApi } from '../services/api';

interface DashboardState {
  stats: IAdminDashboardStats | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  stats: null,
  loading: false,
  error: null,
};

export const fetchAdminDashboard = createAsyncThunk<IAdminDashboardStats, void>(
  'dashboard/fetchAdminDashboard',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchDashboardApi();
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Failed to fetch dashboard';
      return rejectWithValue(message);
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminDashboard.fulfilled, (state, action: PayloadAction<IAdminDashboardStats>) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchAdminDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer;
