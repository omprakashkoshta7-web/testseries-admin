import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IActivityLog, IActivityLogsState } from '../../../types';
import { fetchActivityLogs as fetchActivityLogsApi } from '../services/api';

const initialState: IActivityLogsState = {
  logs: [],
  totalPages: 1,
  currentPage: 1,
  totalLogs: 0,
  loading: false,
  error: null,
};

export const fetchActivityLogs = createAsyncThunk<
  { logs: IActivityLog[]; totalPages: number; currentPage: number; totalLogs: number },
  { page?: number; limit?: number }
>('activityLogs/fetchActivityLogs', async (filters, { rejectWithValue }) => {
  try {
    return await fetchActivityLogsApi(filters);
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to fetch activity logs');
  }
});

const activityLogsSlice = createSlice({
  name: 'activityLogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivityLogs.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchActivityLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = action.payload.logs;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalLogs = action.payload.totalLogs;
      })
      .addCase(fetchActivityLogs.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
  },
});

export default activityLogsSlice.reducer;
