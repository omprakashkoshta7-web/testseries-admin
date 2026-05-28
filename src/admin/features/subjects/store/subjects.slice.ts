import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IAdminSubject, IAdminSubjectsState } from '../../../types';
import {
  fetchAdminSubjectsApi,
  createAdminSubjectApi,
  updateAdminSubjectApi,
  deleteAdminSubjectApi,
} from '../services/api';

const initialState: IAdminSubjectsState = { items: [], loading: false, error: null };

export const fetchAdminSubjects = createAsyncThunk('adminSubjects/fetch', async (_, { rejectWithValue }) => {
  try {
    return await fetchAdminSubjectsApi();
  } catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to fetch'); }
});

export const createAdminSubject = createAsyncThunk('adminSubjects/create', async (form: Partial<IAdminSubject>, { rejectWithValue }) => {
  try {
    return await createAdminSubjectApi(form);
  } catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to create'); }
});

export const updateAdminSubject = createAsyncThunk('adminSubjects/update', async ({ id, form }: { id: string; form: Partial<IAdminSubject> }, { rejectWithValue }) => {
  try {
    return await updateAdminSubjectApi({ id, form });
  } catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to update'); }
});

export const deleteAdminSubject = createAsyncThunk('adminSubjects/delete', async (id: string, { rejectWithValue }) => {
  try {
    return await deleteAdminSubjectApi(id);
  } catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to delete'); }
});

const subjectsSlice = createSlice({
  name: 'adminSubjects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminSubjects.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchAdminSubjects.fulfilled, (s, a) => { s.loading = false; s.items = a.payload; })
      .addCase(fetchAdminSubjects.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; })
      .addCase(createAdminSubject.fulfilled, (s, a) => { s.items.unshift(a.payload); })
      .addCase(updateAdminSubject.fulfilled, (s, a) => { s.items = s.items.map((i) => (i._id === a.payload._id ? a.payload : i)); })
      .addCase(deleteAdminSubject.fulfilled, (s, a) => { s.items = s.items.filter((i) => i._id !== a.payload); });
  },
});

export default subjectsSlice.reducer;
