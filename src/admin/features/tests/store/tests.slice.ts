import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { ITest, ITestsState, ITestFilter, ITestForm } from '../../../types';
import {
  fetchAdminTests as fetchAdminTestsApi,
  createTest as createTestApi,
  updateTest as updateTestApi,
  deleteTest as deleteTestApi,
  duplicateTest as duplicateTestApi,
  bulkCreateTests as bulkCreateTestsApi,
} from '../services/api';

const initialState: ITestsState = {
  tests: [],
  testDetail: null,
  totalPages: 1,
  currentPage: 1,
  totalTests: 0,
  loading: false,
  error: null,
};

export const fetchAdminTests = createAsyncThunk<
  { tests: ITest[]; totalPages: number; currentPage: number; totalTests: number },
  ITestFilter
>('tests/fetchAdminTests', async (filters, { rejectWithValue }) => {
  try {
    return await fetchAdminTestsApi(filters);
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || 'Failed to fetch tests';
    return rejectWithValue(message);
  }
});

export const createTest = createAsyncThunk<ITest, ITestForm>(
  'tests/createTest',
  async (data, { rejectWithValue }) => {
    try {
      return await createTestApi(data);
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Failed to create test';
      return rejectWithValue(message);
    }
  }
);

export const updateTest = createAsyncThunk<ITest, { id: string; data: Partial<ITestForm> }>(
  'tests/updateTest',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateTestApi(id, data);
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Failed to update test';
      return rejectWithValue(message);
    }
  }
);

export const deleteTest = createAsyncThunk<string, string>(
  'tests/deleteTest',
  async (id, { rejectWithValue }) => {
    try {
      return await deleteTestApi(id);
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Failed to delete test';
      return rejectWithValue(message);
    }
  }
);

export const duplicateTest = createAsyncThunk<ITest, string>(
  'tests/duplicateTest',
  async (id, { rejectWithValue }) => {
    try {
      return await duplicateTestApi(id);
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Failed to duplicate test';
      return rejectWithValue(message);
    }
  }
);

export const bulkCreateTests = createAsyncThunk<{ tests: ITest[]; count: number }, ITestForm[]>(
  'tests/bulkCreateTests',
  async (data, { rejectWithValue }) => {
    try {
      return await bulkCreateTestsApi(data);
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Failed to bulk create tests';
      return rejectWithValue(message);
    }
  }
);

const testsSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    clearTestDetail(state) {
      state.testDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminTests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminTests.fulfilled, (state, action) => {
        state.loading = false;
        state.tests = action.payload.tests;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalTests = action.payload.totalTests;
      })
      .addCase(fetchAdminTests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createTest.fulfilled, (state, action) => {
        state.tests.unshift(action.payload);
        state.totalTests += 1;
      })
      .addCase(updateTest.fulfilled, (state, action) => {
        const idx = state.tests.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) state.tests[idx] = action.payload;
      })
      .addCase(deleteTest.fulfilled, (state, action) => {
        state.tests = state.tests.filter((t) => t.id !== action.payload);
        state.totalTests -= 1;
      })
      .addCase(duplicateTest.fulfilled, (state, action) => {
        state.tests.unshift(action.payload);
        state.totalTests += 1;
      })
      .addCase(bulkCreateTests.fulfilled, (state, action) => {
        state.tests.unshift(...action.payload.tests);
        state.totalTests += action.payload.count;
      });
  },
});

export const { clearTestDetail } = testsSlice.actions;
export default testsSlice.reducer;
