import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IMaterialPurchaseItem } from '../../../types';
import { fetchMaterialPurchases as fetchMaterialPurchasesApi } from '../services/api';

interface IMaterialPurchasesState {
  purchases: IMaterialPurchaseItem[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: IMaterialPurchasesState = {
  purchases: [],
  total: 0,
  loading: false,
  error: null,
};

export const fetchMaterialPurchases = createAsyncThunk<
  { purchases: IMaterialPurchaseItem[]; total: number },
  void
>('materialPurchases/fetchMaterialPurchases', async (_, { rejectWithValue }) => {
  try {
    return await fetchMaterialPurchasesApi();
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to fetch material purchases');
  }
});

const materialPurchasesSlice = createSlice({
  name: 'materialPurchases',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterialPurchases.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchMaterialPurchases.fulfilled, (state, action) => {
        state.loading = false;
        state.purchases = action.payload.purchases;
        state.total = action.payload.total;
      })
      .addCase(fetchMaterialPurchases.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
  },
});

export default materialPurchasesSlice.reducer;
