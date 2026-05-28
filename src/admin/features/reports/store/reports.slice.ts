import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IResult, IRevenueReport, IAttemptReport, IResultsState, IReportsState } from '../../../types';
import {
  fetchResults as fetchResultsApi,
  generateRanks as generateRanksApi,
  fetchRevenueReport as fetchRevenueReportApi,
  fetchAttemptReport as fetchAttemptReportApi,
  downloadReportCsv as downloadReportCsvApi,
} from '../services/api';

const initialResultsState: IResultsState = {
  results: [],
  totalPages: 1,
  currentPage: 1,
  totalResults: 0,
  loading: false,
  error: null,
};

const initialReportsState: IReportsState = {
  revenueReport: [],
  attemptReport: [],
  period: '30d',
  loading: false,
  error: null,
};

// Results
export const fetchResults = createAsyncThunk<
  { results: IResult[]; totalPages: number; currentPage: number; totalResults: number },
  { testId?: string; page?: number; limit?: number }
>('reports/fetchResults', async (filters, { rejectWithValue }) => {
  try {
    return await fetchResultsApi(filters);
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to fetch results');
  }
});

export const generateRanks = createAsyncThunk<{ ranks: { resultId: string; rank: number }[]; total: number }, string>(
  'reports/generateRanks',
  async (testId, { rejectWithValue }) => {
    try {
      return await generateRanksApi(testId);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to generate ranks');
    }
  }
);

// Reports
export const fetchRevenueReport = createAsyncThunk<{ report: IRevenueReport[]; period: string }, string>(
  'reports/fetchRevenueReport',
  async (period, { rejectWithValue }) => {
    try {
      return await fetchRevenueReportApi(period);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to fetch revenue report');
    }
  }
);

export const fetchAttemptReport = createAsyncThunk<{ report: IAttemptReport[] }, string | undefined>(
  'reports/fetchAttemptReport',
  async (testId, { rejectWithValue }) => {
    try {
      return await fetchAttemptReportApi(testId);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to fetch attempt report');
    }
  }
);

export const downloadReportCsv = createAsyncThunk<void, string>(
  'reports/downloadCsv',
  async (type, { rejectWithValue }) => {
    try {
      await downloadReportCsvApi(type);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to download report');
    }
  }
);

// Results slice
const resultsSlice = createSlice({
  name: 'results',
  initialState: initialResultsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalResults = action.payload.totalResults;
      })
      .addCase(fetchResults.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
  },
});

// Reports slice
const reportsSlice = createSlice({
  name: 'reports',
  initialState: initialReportsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRevenueReport.pending, (state) => { state.loading = true; })
      .addCase(fetchRevenueReport.fulfilled, (state, action) => {
        state.loading = false;
        state.revenueReport = action.payload.report;
        state.period = action.payload.period;
      })
      .addCase(fetchRevenueReport.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(fetchAttemptReport.pending, (state) => { state.loading = true; })
      .addCase(fetchAttemptReport.fulfilled, (state, action) => {
        state.loading = false;
        state.attemptReport = action.payload.report;
      })
      .addCase(fetchAttemptReport.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
  },
});

export const resultsReducer = resultsSlice.reducer;
export const reportsReducer = reportsSlice.reducer;
