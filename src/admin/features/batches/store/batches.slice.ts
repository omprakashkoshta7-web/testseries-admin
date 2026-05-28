import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IBatch, IGroup, IBatchesGroupsState, IBatchForm, IGroupForm } from '../../../types';
import {
  fetchBatches as fetchBatchesApi,
  createBatch as createBatchApi,
  updateBatch as updateBatchApi,
  deleteBatch as deleteBatchApi,
  fetchGroups as fetchGroupsApi,
  createGroup as createGroupApi,
  deleteGroup as deleteGroupApi,
} from '../services/api';

const initialState: IBatchesGroupsState = {
  batches: [],
  groups: [],
  loading: false,
  error: null,
};

export const fetchBatches = createAsyncThunk<{ batches: IBatch[] }, void>(
  'batches/fetchBatches',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchBatchesApi();
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to fetch batches');
    }
  }
);

export const createBatch = createAsyncThunk<{ id: string; name: string; code: string }, IBatchForm>(
  'batches/createBatch',
  async (data, { rejectWithValue }) => {
    try {
      return await createBatchApi(data);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to create batch');
    }
  }
);

export const updateBatch = createAsyncThunk<any, { id: string; data: Partial<IBatchForm> }>(
  'batches/updateBatch',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateBatchApi(id, data);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to update batch');
    }
  }
);

export const deleteBatch = createAsyncThunk<string, string>(
  'batches/deleteBatch',
  async (id, { rejectWithValue }) => {
    try {
      return await deleteBatchApi(id);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to delete batch');
    }
  }
);

export const fetchGroups = createAsyncThunk<{ groups: IGroup[] }, void>(
  'batches/fetchGroups',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchGroupsApi();
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to fetch groups');
    }
  }
);

export const createGroup = createAsyncThunk<{ id: string; name: string }, IGroupForm>(
  'batches/createGroup',
  async (data, { rejectWithValue }) => {
    try {
      return await createGroupApi(data);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to create group');
    }
  }
);

export const deleteGroup = createAsyncThunk<string, string>(
  'batches/deleteGroup',
  async (id, { rejectWithValue }) => {
    try {
      return await deleteGroupApi(id);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to delete group');
    }
  }
);

const batchesSlice = createSlice({
  name: 'batches',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBatches.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchBatches.fulfilled, (state, action) => { state.loading = false; state.batches = action.payload.batches; })
      .addCase(fetchBatches.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(createBatch.fulfilled, (state, action) => {
        state.batches.unshift({ ...action.payload, description: '', subjects: [], startDate: '', isActive: true, studentCount: 0, createdAt: new Date().toISOString() });
      })
      .addCase(updateBatch.fulfilled, (state, action) => {
        const idx = state.batches.findIndex((b) => b.id === action.payload.id);
        if (idx !== -1) state.batches[idx] = { ...state.batches[idx], ...action.payload };
      })
      .addCase(deleteBatch.fulfilled, (state, action) => {
        state.batches = state.batches.filter((b) => b.id !== action.payload);
      })
      .addCase(fetchGroups.pending, (state) => { state.loading = true; })
      .addCase(fetchGroups.fulfilled, (state, action) => { state.loading = false; state.groups = action.payload.groups; })
      .addCase(fetchGroups.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.groups.unshift({ ...action.payload, description: '', memberCount: 0, createdAt: new Date().toISOString() });
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.groups = state.groups.filter((g) => g.id !== action.payload);
      });
  },
});

export default batchesSlice.reducer;
