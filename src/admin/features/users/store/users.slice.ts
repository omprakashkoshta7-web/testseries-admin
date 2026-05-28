import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IUser, IUsersState, IUserFilter } from '../../../types';
import {
  fetchUsers as fetchUsersApi,
  deleteUser as deleteUserApi,
  updateUserStatus as updateUserStatusApi,
  fetchUserDetails as fetchUserDetailsApi,
  createUser as createUserApi,
} from '../services/api';

const initialState: IUsersState = {
  users: [],
  userDetail: null,
  totalPages: 1,
  currentPage: 1,
  totalUsers: 0,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<
  { users: IUser[]; totalPages: number; currentPage: number; totalUsers: number },
  IUserFilter
>('users/fetchUsers', async (filters, { rejectWithValue }) => {
  try {
    return await fetchUsersApi(filters);
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || 'Failed to fetch users';
    return rejectWithValue(message);
  }
});

export const deleteUser = createAsyncThunk<string, string>(
  'users/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      return await deleteUserApi(id);
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Failed to delete user';
      return rejectWithValue(message);
    }
  }
);

export const updateUserStatus = createAsyncThunk<{ id: string; status: string }, { id: string; status: string }>(
  'users/updateUserStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      return await updateUserStatusApi(id, status);
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Failed to update user status';
      return rejectWithValue(message);
    }
  }
);

export const createUser = createAsyncThunk<IUser, { name: string; email: string; password: string; phone?: string; role?: string }>(
  'users/createUser',
  async (data, { rejectWithValue }) => {
    try {
      return await createUserApi(data);
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Failed to create user';
      return rejectWithValue(message);
    }
  }
);

export const fetchUserDetails = createAsyncThunk<IUser, string>(
  'users/fetchUserDetails',
  async (id, { rejectWithValue }) => {
    try {
      return await fetchUserDetailsApi(id);
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Failed to fetch user details';
      return rejectWithValue(message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUserDetail(state) {
      state.userDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalUsers = action.payload.totalUsers;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.unshift(action.payload);
        state.totalUsers += 1;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        const idx = state.users.findIndex((u) => u.id === action.payload.id);
        if (idx !== -1) {
          state.users[idx].status = action.payload.status as IUser['status'];
        }
        if (state.userDetail?.id === action.payload.id) {
          state.userDetail.status = action.payload.status as IUser['status'];
        }
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetail = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUserDetail } = usersSlice.actions;
export default usersSlice.reducer;
