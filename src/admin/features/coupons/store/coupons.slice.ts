import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { ICoupon, ICouponsState, ICouponForm } from '../../../types';
import {
  fetchCoupons as fetchCouponsApi,
  createCoupon as createCouponApi,
  updateCoupon as updateCouponApi,
  deleteCoupon as deleteCouponApi,
} from '../services/api';

const initialState: ICouponsState = {
  coupons: [],
  loading: false,
  error: null,
};

export const fetchCoupons = createAsyncThunk<ICoupon[], void>(
  'coupons/fetchCoupons',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchCouponsApi();
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to fetch coupons');
    }
  }
);

export const createCoupon = createAsyncThunk<ICoupon, ICouponForm>(
  'coupons/createCoupon',
  async (data, { rejectWithValue }) => {
    try {
      return await createCouponApi(data);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to create coupon');
    }
  }
);

export const updateCoupon = createAsyncThunk<ICoupon, { id: string; data: Partial<ICouponForm> }>(
  'coupons/updateCoupon',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateCouponApi(id, data);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to update coupon');
    }
  }
);

export const deleteCoupon = createAsyncThunk<string, string>(
  'coupons/deleteCoupon',
  async (id, { rejectWithValue }) => {
    try {
      return await deleteCouponApi(id);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to delete coupon');
    }
  }
);

const couponsSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoupons.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchCoupons.fulfilled, (state, action) => { state.loading = false; state.coupons = action.payload; })
      .addCase(fetchCoupons.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(createCoupon.fulfilled, (state, action) => { state.coupons.unshift(action.payload); })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        const idx = state.coupons.findIndex((c) => c._id === action.payload._id);
        if (idx !== -1) state.coupons[idx] = action.payload;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.coupons = state.coupons.filter((c) => c._id !== action.payload);
      });
  },
});

export default couponsSlice.reducer;
