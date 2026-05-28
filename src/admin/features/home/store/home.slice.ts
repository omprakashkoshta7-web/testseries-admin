import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IHomeContent, IHomeContentState, IHomeContentForm } from '../../../types';
import {
  fetchHomeContents as fetchHomeContentsApi,
  createHomeContent as createHomeContentApi,
  updateHomeContent as updateHomeContentApi,
  deleteHomeContent as deleteHomeContentApi,
} from '../services/api';

const initialState: IHomeContentState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchHomeContents = createAsyncThunk<IHomeContent[], void>(
  'homeContent/fetchHomeContents',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchHomeContentsApi();
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to fetch home contents');
    }
  }
);

export const createHomeContent = createAsyncThunk<IHomeContent, IHomeContentForm>(
  'homeContent/createHomeContent',
  async (data, { rejectWithValue }) => {
    try {
      return await createHomeContentApi(data);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to create home content');
    }
  }
);

export const updateHomeContent = createAsyncThunk<IHomeContent, { id: string; data: Partial<IHomeContentForm> }>(
  'homeContent/updateHomeContent',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateHomeContentApi(id, data);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to update home content');
    }
  }
);

export const deleteHomeContent = createAsyncThunk<string, string>(
  'homeContent/deleteHomeContent',
  async (id, { rejectWithValue }) => {
    try {
      return await deleteHomeContentApi(id);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to delete home content');
    }
  }
);

const homeContentSlice = createSlice({
  name: 'homeContent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeContents.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchHomeContents.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchHomeContents.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(createHomeContent.fulfilled, (state, action) => { state.items.unshift(action.payload); })
      .addCase(updateHomeContent.fulfilled, (state, action) => {
        const idx = state.items.findIndex((i) => i._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteHomeContent.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i._id !== action.payload);
      });
  },
});

export default homeContentSlice.reducer;
