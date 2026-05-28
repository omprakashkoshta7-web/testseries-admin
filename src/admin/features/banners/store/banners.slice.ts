import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IBanner, IBannersState, IBannerForm } from '../../../types';
import {
  fetchBanners as fetchBannersApi,
  createBanner as createBannerApi,
  updateBanner as updateBannerApi,
  deleteBanner as deleteBannerApi,
} from '../services/api';

const initialState: IBannersState = {
  banners: [],
  loading: false,
  error: null,
};

export const fetchBanners = createAsyncThunk<IBanner[], void>(
  'banners/fetchBanners',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchBannersApi();
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to fetch banners');
    }
  }
);

export const createBanner = createAsyncThunk<IBanner, IBannerForm>(
  'banners/createBanner',
  async (data, { rejectWithValue }) => {
    try {
      return await createBannerApi(data);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to create banner');
    }
  }
);

export const updateBanner = createAsyncThunk<IBanner, { id: string; data: Partial<IBannerForm> }>(
  'banners/updateBanner',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateBannerApi(id, data);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to update banner');
    }
  }
);

export const deleteBanner = createAsyncThunk<string, string>(
  'banners/deleteBanner',
  async (id, { rejectWithValue }) => {
    try {
      return await deleteBannerApi(id);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to delete banner');
    }
  }
);

const bannersSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchBanners.fulfilled, (state, action) => { state.loading = false; state.banners = action.payload; })
      .addCase(fetchBanners.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(createBanner.fulfilled, (state, action) => { state.banners.unshift(action.payload); })
      .addCase(updateBanner.fulfilled, (state, action) => {
        const idx = state.banners.findIndex((b) => b._id === action.payload._id);
        if (idx !== -1) state.banners[idx] = action.payload;
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.banners = state.banners.filter((b) => b._id !== action.payload);
      });
  },
});

export default bannersSlice.reducer;
