import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IAnnouncement, IAnnouncementsState, IAnnouncementForm } from '../../../types';
import {
  fetchAnnouncements as fetchAnnouncementsApi,
  createAnnouncement as createAnnouncementApi,
  updateAnnouncement as updateAnnouncementApi,
  deleteAnnouncement as deleteAnnouncementApi,
} from '../services/api';

const initialState: IAnnouncementsState = {
  announcements: [],
  loading: false,
  error: null,
};

export const fetchAnnouncements = createAsyncThunk<IAnnouncement[], void>(
  'announcements/fetchAnnouncements',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAnnouncementsApi();
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to fetch announcements');
    }
  }
);

export const createAnnouncement = createAsyncThunk<IAnnouncement, IAnnouncementForm>(
  'announcements/createAnnouncement',
  async (data, { rejectWithValue }) => {
    try {
      return await createAnnouncementApi(data);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to create announcement');
    }
  }
);

export const updateAnnouncement = createAsyncThunk<IAnnouncement, { id: string; data: IAnnouncementForm }>(
  'announcements/updateAnnouncement',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateAnnouncementApi(id, data);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to update announcement');
    }
  }
);

export const deleteAnnouncement = createAsyncThunk<string, string>(
  'announcements/deleteAnnouncement',
  async (id, { rejectWithValue }) => {
    try {
      return await deleteAnnouncementApi(id);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to delete announcement');
    }
  }
);

const announcementsSlice = createSlice({
  name: 'announcements',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnouncements.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => { state.loading = false; state.announcements = action.payload; })
      .addCase(fetchAnnouncements.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(createAnnouncement.fulfilled, (state, action) => { state.announcements.unshift(action.payload); })
      .addCase(updateAnnouncement.fulfilled, (state, action) => {
        state.announcements = state.announcements.map((a) => a._id === action.payload._id ? action.payload : a);
      })
      .addCase(deleteAnnouncement.fulfilled, (state, action) => {
        state.announcements = state.announcements.filter((a) => a._id !== action.payload);
      });
  },
});

export default announcementsSlice.reducer;
