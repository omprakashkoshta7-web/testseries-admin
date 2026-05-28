import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { IAnalyticsData } from '../../../types';
import { fetchAnalytics as fetchAnalyticsApi } from '../services/api';

interface AnalyticsState {
  data: IAnalyticsData | null;
  loading: boolean;
  error: string | null;
}

const initialState: AnalyticsState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchAnalytics = createAsyncThunk<IAnalyticsData, string | undefined>(
  'analytics/fetchAnalytics',
  async (period = '30d', { rejectWithValue }) => {
    try {
      return await fetchAnalyticsApi(period);
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Failed to fetch analytics';
      return rejectWithValue(message);
    }
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action: PayloadAction<IAnalyticsData>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default analyticsSlice.reducer;
