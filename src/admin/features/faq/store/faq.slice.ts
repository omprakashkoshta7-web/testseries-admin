import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IFaq, IFaqsState, IFaqForm } from '../../../types';
import {
  fetchFaqs as fetchFaqsApi,
  createFaq as createFaqApi,
  updateFaq as updateFaqApi,
  deleteFaq as deleteFaqApi,
} from '../services/api';

const initialState: IFaqsState = {
  faqs: [],
  loading: false,
  error: null,
};

export const fetchFaqs = createAsyncThunk<IFaq[], void>(
  'faq/fetchFaqs',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchFaqsApi();
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to fetch FAQs');
    }
  }
);

export const createFaq = createAsyncThunk<IFaq, IFaqForm>(
  'faq/createFaq',
  async (data, { rejectWithValue }) => {
    try {
      return await createFaqApi(data);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to create FAQ');
    }
  }
);

export const updateFaq = createAsyncThunk<IFaq, { id: string; data: Partial<IFaqForm> }>(
  'faq/updateFaq',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateFaqApi(id, data);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to update FAQ');
    }
  }
);

export const deleteFaq = createAsyncThunk<string, string>(
  'faq/deleteFaq',
  async (id, { rejectWithValue }) => {
    try {
      return await deleteFaqApi(id);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to delete FAQ');
    }
  }
);

const faqSlice = createSlice({
  name: 'faq',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaqs.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchFaqs.fulfilled, (state, action) => { state.loading = false; state.faqs = action.payload; })
      .addCase(fetchFaqs.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(createFaq.fulfilled, (state, action) => { state.faqs.push(action.payload); })
      .addCase(updateFaq.fulfilled, (state, action) => {
        const idx = state.faqs.findIndex((f) => f._id === action.payload._id);
        if (idx !== -1) state.faqs[idx] = action.payload;
      })
      .addCase(deleteFaq.fulfilled, (state, action) => {
        state.faqs = state.faqs.filter((f) => f._id !== action.payload);
      });
  },
});

export default faqSlice.reducer;
