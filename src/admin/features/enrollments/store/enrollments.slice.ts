import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IEnrollmentItem } from '../../../types';
import { fetchEnrollments as fetchEnrollmentsApi } from '../services/api';

interface IEnrollmentsState {
  enrollments: IEnrollmentItem[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: IEnrollmentsState = {
  enrollments: [],
  total: 0,
  loading: false,
  error: null,
};

export const fetchEnrollments = createAsyncThunk<
  { enrollments: IEnrollmentItem[]; total: number },
  void
>('enrollments/fetchEnrollments', async (_, { rejectWithValue }) => {
  try {
    return await fetchEnrollmentsApi();
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to fetch enrollments');
  }
});

const enrollmentsSlice = createSlice({
  name: 'enrollments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrollments.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchEnrollments.fulfilled, (state, action) => {
        state.loading = false;
        state.enrollments = action.payload.enrollments;
        state.total = action.payload.total;
      })
      .addCase(fetchEnrollments.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
  },
});

export default enrollmentsSlice.reducer;
