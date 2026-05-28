import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { INotification, INotificationsState, INotificationForm } from '../../../types';
import {
  fetchNotifications as fetchNotificationsApi,
  createNotification as createNotificationApi,
  sendNotification as sendNotificationApi,
  updateNotification as updateNotificationApi,
  deleteNotification as deleteNotificationApi,
} from '../services/api';

const initialState: INotificationsState = {
  notifications: [],
  totalPages: 1,
  currentPage: 1,
  totalNotifications: 0,
  loading: false,
  error: null,
};

export const fetchNotifications = createAsyncThunk<
  { notifications: INotification[]; totalPages: number; currentPage: number; totalNotifications: number },
  { page?: number; limit?: number }
>('notifications/fetchNotifications', async (filters, { rejectWithValue }) => {
  try {
    return await fetchNotificationsApi(filters);
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to fetch notifications');
  }
});

export const createNotification = createAsyncThunk<INotification, INotificationForm>(
  'notifications/createNotification',
  async (data, { rejectWithValue }) => {
    try {
      return await createNotificationApi(data);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to create notification');
    }
  }
);

export const sendNotification = createAsyncThunk<INotification, string>(
  'notifications/sendNotification',
  async (id, { rejectWithValue }) => {
    try {
      return await sendNotificationApi(id);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to send notification');
    }
  }
);

export const updateNotification = createAsyncThunk<INotification, { id: string; data: Partial<INotificationForm> }>(
  'notifications/updateNotification',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateNotificationApi(id, data);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to update notification');
    }
  }
);

export const deleteNotification = createAsyncThunk<string, string>(
  'notifications/deleteNotification',
  async (id, { rejectWithValue }) => {
    try {
      await deleteNotificationApi(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to delete notification');
    }
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload.notifications;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.totalNotifications = action.payload.totalNotifications;
      })
      .addCase(fetchNotifications.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(createNotification.fulfilled, (state, action) => { state.notifications.unshift(action.payload); })
      .addCase(sendNotification.fulfilled, (state, action) => {
        const idx = state.notifications.findIndex((n) => n._id === action.payload._id);
        if (idx !== -1) state.notifications[idx] = action.payload;
      })
      .addCase(updateNotification.fulfilled, (state, action) => {
        const idx = state.notifications.findIndex((n) => n._id === action.payload._id);
        if (idx !== -1) state.notifications[idx] = action.payload;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.notifications = state.notifications.filter((n) => n._id !== action.payload);
      });
  },
});

export default notificationsSlice.reducer;
