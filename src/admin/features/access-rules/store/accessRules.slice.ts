import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IAccessRule, IAccessRulesState } from '../../../types';
import {
  fetchAccessRules as fetchAccessRulesApi,
  createAccessRule as createAccessRuleApi,
  updateAccessRule as updateAccessRuleApi,
  deleteAccessRule as deleteAccessRuleApi,
} from '../services/api';

const initialState: IAccessRulesState = { items: [], loading: false, error: null };

export const fetchAccessRules = createAsyncThunk('accessRules/fetch', async (params: any, { rejectWithValue }) => {
  try {
    return await fetchAccessRulesApi(params);
  } catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to fetch'); }
});

export const createAccessRule = createAsyncThunk('accessRules/create', async (form: Partial<IAccessRule>, { rejectWithValue }) => {
  try {
    return await createAccessRuleApi(form);
  } catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to create'); }
});

export const updateAccessRule = createAsyncThunk('accessRules/update', async ({ id, form }: { id: string; form: Partial<IAccessRule> }, { rejectWithValue }) => {
  try {
    return await updateAccessRuleApi({ id, form });
  } catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to update'); }
});

export const deleteAccessRule = createAsyncThunk('accessRules/delete', async (id: string, { rejectWithValue }) => {
  try {
    return await deleteAccessRuleApi(id);
  } catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to delete'); }
});

const accessRulesSlice = createSlice({
  name: 'accessRules',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccessRules.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchAccessRules.fulfilled, (s, a) => { s.loading = false; s.items = a.payload; })
      .addCase(fetchAccessRules.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; })
      .addCase(createAccessRule.fulfilled, (s, a) => { s.items.unshift(a.payload); })
      .addCase(updateAccessRule.fulfilled, (s, a) => { s.items = s.items.map((i) => (i._id === a.payload._id ? a.payload : i)); })
      .addCase(deleteAccessRule.fulfilled, (s, a) => { s.items = s.items.filter((i) => i._id !== a.payload); });
  },
});

export default accessRulesSlice.reducer;
