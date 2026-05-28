import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IQuestion, IQuestionsState, IQuestionFilter } from '../../../types';
import {
  fetchQuestions as fetchQuestionsApi,
  createQuestion as createQuestionApi,
  updateQuestion as updateQuestionApi,
  deleteQuestion as deleteQuestionApi,
  deleteQuestionsByTest as deleteQuestionsByTestApi,
  bulkUploadQuestions as bulkUploadQuestionsApi,
} from '../services/api';

const initialState: IQuestionsState = {
  questions: [],
  totalPages: 1,
  currentPage: 1,
  totalQuestions: 0,
  loading: false,
  error: null,
};

export const fetchQuestions = createAsyncThunk<
  { questions: IQuestion[]; totalPages: number; currentPage: number; totalQuestions: number },
  IQuestionFilter
>('questions/fetchQuestions', async (filters, { rejectWithValue }) => {
  try {
    return await fetchQuestionsApi(filters);
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to fetch questions');
  }
});

export const createQuestion = createAsyncThunk<IQuestion, Partial<IQuestion>>(
  'questions/createQuestion',
  async (data, { rejectWithValue }) => {
    try {
      return await createQuestionApi(data);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to create question');
    }
  }
);

export const updateQuestion = createAsyncThunk<IQuestion, { id: string; data: Partial<IQuestion> }>(
  'questions/updateQuestion',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateQuestionApi(id, data);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to update question');
    }
  }
);

export const deleteQuestion = createAsyncThunk<string, string>(
  'questions/deleteQuestion',
  async (id, { rejectWithValue }) => {
    try {
      return await deleteQuestionApi(id);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to delete question');
    }
  }
);

export const deleteQuestionsByTest = createAsyncThunk<{ testId: string; count: number }, string>(
  'questions/deleteByTest',
  async (testId, { rejectWithValue }) => {
    try {
      return await deleteQuestionsByTestApi(testId);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to delete test questions');
    }
  }
);

export const bulkUploadQuestions = createAsyncThunk<{ count: number }, { questions: any[] }>(
  'questions/bulkUpload',
  async ({ questions }, { rejectWithValue }) => {
    try {
      return await bulkUploadQuestionsApi(questions);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Bulk upload failed');
    }
  }
);

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload.questions;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalQuestions = action.payload.totalQuestions;
      })
      .addCase(fetchQuestions.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(createQuestion.fulfilled, (state, action) => { state.questions.unshift(action.payload); state.totalQuestions += 1; })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        const idx = state.questions.findIndex((q) => q._id === action.payload._id);
        if (idx !== -1) state.questions[idx] = action.payload;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.questions = state.questions.filter((q) => q._id !== action.payload);
        state.totalQuestions -= 1;
      })
      .addCase(deleteQuestionsByTest.fulfilled, (state, action) => {
        state.questions = state.questions.filter((q) => q.testId !== action.payload.testId);
        state.totalQuestions = Math.max(0, state.totalQuestions - action.payload.count);
      });
  },
});

export default questionsSlice.reducer;
