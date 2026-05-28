import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IAdminPlan, IAdminPlansState } from '../../../types';
import {
  fetchAdminPlansApi,
  createAdminPlanApi,
  updateAdminPlanApi,
  deleteAdminPlanApi,
} from '../services/api';

const initialState: IAdminPlansState = { items: [], loading: false, error: null };

export const fetchAdminPlans = createAsyncThunk('adminPlans/fetch', async (_, { rejectWithValue }) => {
  try {
    return await fetchAdminPlansApi();
  } catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to fetch'); }
});

export const createAdminPlan = createAsyncThunk('adminPlans/create', async (form: Partial<IAdminPlan>, { rejectWithValue }) => {
  try {
    return await createAdminPlanApi(form);
  } catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to create'); }
});

export const updateAdminPlan = createAsyncThunk('adminPlans/update', async ({ id, form }: { id: string; form: Partial<IAdminPlan> }, { rejectWithValue }) => {
  try {
    return await updateAdminPlanApi(id, form);
  } catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to update'); }
});

export const deleteAdminPlan = createAsyncThunk('adminPlans/delete', async (id: string, { rejectWithValue }) => {
  try {
    return await deleteAdminPlanApi(id);
  } catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to delete'); }
});

const plansSlice = createSlice({
  name: 'adminPlans',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminPlans.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchAdminPlans.fulfilled, (s, a) => { s.loading = false; s.items = a.payload; })
      .addCase(fetchAdminPlans.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; })
      .addCase(createAdminPlan.fulfilled, (s, a) => { s.items.unshift(a.payload); })
      .addCase(updateAdminPlan.fulfilled, (s, a) => { s.items = s.items.map((i) => (i._id === a.payload._id ? a.payload : i)); })
      .addCase(deleteAdminPlan.fulfilled, (s, a) => { s.items = s.items.filter((i) => i._id !== a.payload); });
  },
});

export default plansSlice.reducer;
