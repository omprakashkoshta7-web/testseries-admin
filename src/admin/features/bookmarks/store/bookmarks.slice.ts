import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IBookmarkUser } from '../../../types';
import { fetchBookmarks as fetchBookmarksApi } from '../services/api';

interface IBookmarksState {
  users: IBookmarkUser[];
  totalBookmarks: number;
  loading: boolean;
  error: string | null;
}

const initialState: IBookmarksState = {
  users: [],
  totalBookmarks: 0,
  loading: false,
  error: null,
};

export const fetchBookmarks = createAsyncThunk<
  { users: IBookmarkUser[]; totalBookmarks: number },
  void
>('bookmarks/fetchBookmarks', async (_, { rejectWithValue }) => {
  try {
    return await fetchBookmarksApi();
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Failed to fetch bookmarks');
  }
});

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarks.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.totalBookmarks = action.payload.totalBookmarks;
      })
      .addCase(fetchBookmarks.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
  },
});

export default bookmarksSlice.reducer;
