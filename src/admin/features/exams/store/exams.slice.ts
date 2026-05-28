import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAdminExamsApi, createAdminExamApi, updateAdminExamApi, deleteAdminExamApi } from '../services/api';
import type { IAdminExam, IAdminExamsState } from '../../../types';

const initialState: IAdminExamsState = { items: [], loading: false, error: null };

export const fetchAdminExams = createAsyncThunk('adminExams/fetch', async (params: any, { rejectWithValue }) => {
  try {
    return await fetchAdminExamsApi(params);
  } catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to fetch'); }
});

export const createAdminExam = createAsyncThunk('adminExams/create', async (form: Partial<IAdminExam>, { rejectWithValue }) => {
  try {
    return await createAdminExamApi(form);
  } catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to create'); }
});

export const updateAdminExam = createAsyncThunk('adminExams/update', async ({ id, form }: { id: string; form: Partial<IAdminExam> }, { rejectWithValue }) => {
  try {
    return await updateAdminExamApi(id, form);
  } catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to update'); }
});

export const deleteAdminExam = createAsyncThunk('adminExams/delete', async (id: string, { rejectWithValue }) => {
  try {
    return await deleteAdminExamApi(id);
  } catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to delete'); }
});

const examsSlice = createSlice({
  name: 'adminExams',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminExams.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchAdminExams.fulfilled, (s, a) => { s.loading = false; s.items = a.payload; })
      .addCase(fetchAdminExams.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; })
      .addCase(createAdminExam.fulfilled, (s, a) => { s.items.unshift(a.payload); })
      .addCase(updateAdminExam.fulfilled, (s, a) => { s.items = s.items.map((i) => (i._id === a.payload._id ? a.payload : i)); })
      .addCase(deleteAdminExam.fulfilled, (s, a) => { s.items = s.items.filter((i) => i._id !== a.payload); });
  },
});

export default examsSlice.reducer;
