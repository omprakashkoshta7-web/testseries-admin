import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { IAdminAuthState, ILoginPayload, ILoginResponse } from '../../../types';
import { login as loginApi } from '../services/api';

const storedUser = localStorage.getItem('adminUser');
const storedToken = localStorage.getItem('adminToken');

const initialState: IAdminAuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  isAuthenticated: !!storedToken,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk<ILoginResponse, ILoginPayload>(
  'auth/loginUser',
  async (payload, { rejectWithValue }) => {
    try {
      return await loginApi(payload);
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Login failed';
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutAdmin(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<ILoginResponse>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logoutAdmin, clearError } = authSlice.actions;
export default authSlice.reducer;
