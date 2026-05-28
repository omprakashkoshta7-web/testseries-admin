import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IReviewItem, IReviewsState } from '../../../types';
import { fetchReviewsApi, createReviewApi, updateReviewStatusApi, deleteReviewApi } from '../services/api';

const initialState: IReviewsState = { items: [], loading: false, error: null };

export const fetchReviews = createAsyncThunk('reviews/fetch', async (params: any, { rejectWithValue }) => {
  try {
    return await fetchReviewsApi(params);
  } catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to fetch'); }
});

export const createReview = createAsyncThunk('reviews/create', async (form: Partial<IReviewItem>, { rejectWithValue }) => {
  try {
    return await createReviewApi(form);
  } catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to create'); }
});

export const updateReviewStatus = createAsyncThunk('reviews/updateStatus', async ({ id, status, comments }: { id: string; status: string; comments?: string }, { rejectWithValue }) => {
  try {
    return await updateReviewStatusApi({ id, status, comments });
  } catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to update'); }
});

export const deleteReview = createAsyncThunk('reviews/delete', async (id: string, { rejectWithValue }) => {
  try {
    return await deleteReviewApi(id);
  } catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to delete'); }
});

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchReviews.fulfilled, (s, a) => { s.loading = false; s.items = a.payload; })
      .addCase(fetchReviews.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; })
      .addCase(createReview.fulfilled, (s, a) => { s.items.unshift(a.payload); })
      .addCase(updateReviewStatus.fulfilled, (s, a) => { s.items = s.items.map((i) => (i._id === a.payload._id ? a.payload : i)); })
      .addCase(deleteReview.fulfilled, (s, a) => { s.items = s.items.filter((i) => i._id !== a.payload); });
  },
});

export default reviewsSlice.reducer;
