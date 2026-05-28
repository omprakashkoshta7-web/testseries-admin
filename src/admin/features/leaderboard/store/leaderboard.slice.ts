import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { ILeaderboardState, ILeaderboardData } from '../../../types';
import { fetchLeaderboard as fetchLeaderboardApi } from '../services/api';

const initialState: ILeaderboardState = {
  entries: [],
  total: 0,
  page: 1,
  limit: 20,
  hasMore: false,
  loading: false,
  error: null,
  timeFilter: 'all',
};

export const fetchLeaderboard = createAsyncThunk<
  ILeaderboardData,
  { page?: number; limit?: number; timeFilter?: string }
>('leaderboard/fetchLeaderboard', async (filters, { rejectWithValue }) => {
  try {
    return await fetchLeaderboardApi(filters);
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to fetch leaderboard');
  }
});

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setTimeFilter(state, action) {
      state.timeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboard.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.entries = action.payload.entries;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
  },
});

export const { setTimeFilter } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
