import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IExamCategory, IExamCategoriesState } from '../../../types';
import {
  fetchExamCategories as fetchExamCategoriesApi,
  createExamCategory as createExamCategoryApi,
  updateExamCategory as updateExamCategoryApi,
  deleteExamCategory as deleteExamCategoryApi,
} from '../services/api';

const initialState: IExamCategoriesState = { items: [], loading: false, error: null };

export const fetchExamCategories = createAsyncThunk('examCategories/fetch', async (_, { rejectWithValue }) => {
  try {
    return await fetchExamCategoriesApi();
  } catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to fetch'); }
});

export const createExamCategory = createAsyncThunk('examCategories/create', async (form: Partial<IExamCategory>, { rejectWithValue }) => {
  try {
    return await createExamCategoryApi(form);
  } catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to create'); }
});

export const updateExamCategory = createAsyncThunk('examCategories/update', async ({ id, form }: { id: string; form: Partial<IExamCategory> }, { rejectWithValue }) => {
  try {
    return await updateExamCategoryApi({ id, form });
  } catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to update'); }
});

export const deleteExamCategory = createAsyncThunk('examCategories/delete', async (id: string, { rejectWithValue }) => {
  try {
    return await deleteExamCategoryApi(id);
  } catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to delete'); }
});

const examCategoriesSlice = createSlice({
  name: 'examCategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExamCategories.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchExamCategories.fulfilled, (s, a) => { s.loading = false; s.items = a.payload; })
      .addCase(fetchExamCategories.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; })
      .addCase(createExamCategory.fulfilled, (s, a) => { s.items.unshift(a.payload); })
      .addCase(updateExamCategory.fulfilled, (s, a) => { s.items = s.items.map((i) => (i._id === a.payload._id ? a.payload : i)); })
      .addCase(deleteExamCategory.fulfilled, (s, a) => { s.items = s.items.filter((i) => i._id !== a.payload); });
  },
});

export default examCategoriesSlice.reducer;
