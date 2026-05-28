import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { ITopic, ITopicsState } from '../../../types';
import {
  fetchTopicsApi,
  createTopicApi,
  updateTopicApi,
  deleteTopicApi,
} from '../services/api';

const initialState: ITopicsState = { items: [], loading: false, error: null };

export const fetchTopics = createAsyncThunk('topics/fetch', async (params: any, { rejectWithValue }) => {
  try {
    return await fetchTopicsApi(params);
  } catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to fetch'); }
});

export const createTopic = createAsyncThunk('topics/create', async (form: Partial<ITopic>, { rejectWithValue }) => {
  try {
    return await createTopicApi(form);
  } catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to create'); }
});

export const updateTopic = createAsyncThunk('topics/update', async ({ id, form }: { id: string; form: Partial<ITopic> }, { rejectWithValue }) => {
  try {
    return await updateTopicApi({ id, form });
  } catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to update'); }
});

export const deleteTopic = createAsyncThunk('topics/delete', async (id: string, { rejectWithValue }) => {
  try {
    return await deleteTopicApi(id);
  } catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to delete'); }
});

const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchTopics.fulfilled, (s, a) => { s.loading = false; s.items = a.payload; })
      .addCase(fetchTopics.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; })
      .addCase(createTopic.fulfilled, (s, a) => { s.items.unshift(a.payload); })
      .addCase(updateTopic.fulfilled, (s, a) => { s.items = s.items.map((i) => (i._id === a.payload._id ? a.payload : i)); })
      .addCase(deleteTopic.fulfilled, (s, a) => { s.items = s.items.filter((i) => i._id !== a.payload); });
  },
});

export default topicsSlice.reducer;
