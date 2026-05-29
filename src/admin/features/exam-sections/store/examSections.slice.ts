import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSectionsApi, createSectionApi, updateSectionApi, deleteSectionApi } from '../services/api';
import type { IExamSection } from '../../../types';

interface State {
  items: IExamSection[];
  loading: boolean;
  error: string | null;
}

const initialState: State = { items: [], loading: false, error: null };

export const fetchExamSections = createAsyncThunk('examSections/fetch', async (params: any, thunkAPI) => {
  try { return await fetchSectionsApi(params); }
  catch (err: any) { return thunkAPI.rejectWithValue(err.message); }
});

export const createExamSection = createAsyncThunk('examSections/create', async (form: Partial<IExamSection>, thunkAPI) => {
  try { return await createSectionApi(form); }
  catch (err: any) { return thunkAPI.rejectWithValue(err.message); }
});

export const updateExamSection = createAsyncThunk('examSections/update', async ({ id, form }: { id: string; form: Partial<IExamSection> }, thunkAPI) => {
  try { return await updateSectionApi(id, form); }
  catch (err: any) { return thunkAPI.rejectWithValue(err.message); }
});

export const deleteExamSection = createAsyncThunk('examSections/delete', async (id: string, thunkAPI) => {
  try { await deleteSectionApi(id); return id; }
  catch (err: any) { return thunkAPI.rejectWithValue(err.message); }
});

const examSectionsSlice = createSlice({
  name: 'examSections',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExamSections.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchExamSections.fulfilled, (s, a) => { s.loading = false; s.items = a.payload; })
      .addCase(fetchExamSections.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; })
      .addCase(createExamSection.fulfilled, (s, a) => { s.items.push(a.payload); })
      .addCase(updateExamSection.fulfilled, (s, a) => { const i = s.items.findIndex((x) => x._id === a.payload._id); if (i >= 0) s.items[i] = a.payload; })
      .addCase(deleteExamSection.fulfilled, (s, a) => { s.items = s.items.filter((x) => x._id !== a.payload); });
  },
});

export default examSectionsSlice.reducer;
