import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSettings as fetchSettingsApi, updateSettings as updateSettingsApi } from '../services/api';

export const fetchSettings = createAsyncThunk<Record<string, any>, void, { rejectValue: string }>(
  'settings/fetchSettings',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchSettingsApi();
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to fetch settings');
    }
  }
);

export const updateSettings = createAsyncThunk<Record<string, any>, Record<string, any>, { rejectValue: string }>(
  'settings/updateSettings',
  async (data, { rejectWithValue }) => {
    try {
      return await updateSettingsApi(data);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to update settings');
    }
  }
);

interface SettingsState {
  settings: Record<string, any>;
  loading: boolean;
  saving: boolean;
  saved: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  settings: {},
  loading: false,
  saving: false,
  saved: false,
  error: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    clearSaved(state) { state.saved = false; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(updateSettings.pending, (state) => { state.saving = true; state.error = null; })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.saving = false;
        state.saved = true;
        state.settings = action.payload;
      })
      .addCase(updateSettings.rejected, (state, action) => { state.saving = false; state.error = action.payload as string; });
  },
});

export const { clearSaved } = settingsSlice.actions;
export default settingsSlice.reducer;
