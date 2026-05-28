import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IAdminSubject, IAdminStudyMaterial, IAdminStudyState } from '../../../types';
import {
  fetchSubjects as fetchSubjectsApi,
  createSubject as createSubjectApi,
  updateSubject as updateSubjectApi,
  deleteSubject as deleteSubjectApi,
  fetchAdminMaterials as fetchAdminMaterialsApi,
  createMaterial as createMaterialApi,
  updateMaterial as updateMaterialApi,
  deleteMaterial as deleteMaterialApi,
} from '../services/api';

const initialState: IAdminStudyState = {
  subjects: [],
  materials: [],
  loading: false,
  error: null,
  subjectForm: { name: '', icon: 'BookOpen', color: '#3273e6', description: '' },
  materialForm: {
    title: '', description: '', subject: '', category: 'notes', chapter: '',
    duration: 30, author: '', tags: '', content: '', pdfUrl: '', videoUrl: '', isActive: true, pdfUpload: null,
  },
};

export const fetchSubjects = createAsyncThunk<IAdminSubject[], void>('study/fetchSubjects', async (_, { rejectWithValue }) => {
  try { return await fetchSubjectsApi(); }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || 'Failed to fetch subjects'); }
});

export const createSubject = createAsyncThunk<any, { name: string; icon: string; color: string; description: string }>(
  'study/createSubject', async (data, { rejectWithValue }) => {
    try { return await createSubjectApi(data); }
    catch (e: any) { return rejectWithValue(e?.response?.data?.message || 'Failed to create subject'); }
  }
);

export const updateSubject = createAsyncThunk<any, { id: string; data: any }>(
  'study/updateSubject', async ({ id, data }, { rejectWithValue }) => {
    try { return await updateSubjectApi(id, data); }
    catch (e: any) { return rejectWithValue(e?.response?.data?.message || 'Failed to update subject'); }
  }
);

export const deleteSubject = createAsyncThunk<string, string>(
  'study/deleteSubject', async (id, { rejectWithValue }) => {
    try { return await deleteSubjectApi(id); }
    catch (e: any) { return rejectWithValue(e?.response?.data?.message || 'Failed to delete subject'); }
  }
);

export const fetchAdminMaterials = createAsyncThunk<IAdminStudyMaterial[], { subject?: string }>(
  'study/fetchAdminMaterials', async (params, { rejectWithValue }) => {
    try { return await fetchAdminMaterialsApi(params); }
    catch (e: any) { return rejectWithValue(e?.response?.data?.message || 'Failed to fetch materials'); }
  }
);

export const createMaterial = createAsyncThunk<any, any>(
  'study/createMaterial', async (data, { rejectWithValue }) => {
    try { return await createMaterialApi(data); }
    catch (e: any) { return rejectWithValue(e?.response?.data?.message || 'Failed to create material'); }
  }
);

export const updateMaterial = createAsyncThunk<any, { id: string; data: any }>(
  'study/updateMaterial', async ({ id, data }, { rejectWithValue }) => {
    try { return await updateMaterialApi(id, data); }
    catch (e: any) { return rejectWithValue(e?.response?.data?.message || 'Failed to update material'); }
  }
);

export const deleteMaterial = createAsyncThunk<string, string>(
  'study/deleteMaterial', async (id, { rejectWithValue }) => {
    try { return await deleteMaterialApi(id); }
    catch (e: any) { return rejectWithValue(e?.response?.data?.message || 'Failed to delete material'); }
  }
);

const studySlice = createSlice({
  name: 'study',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.fulfilled, (state, action) => { state.subjects = action.payload; })
      .addCase(fetchSubjects.rejected, (state, action) => { state.error = action.payload as string; })
      .addCase(createSubject.fulfilled, (state) => { state.error = null; })
      .addCase(updateSubject.fulfilled, (state) => { state.error = null; })
      .addCase(deleteSubject.fulfilled, (state, action) => { state.subjects = state.subjects.filter((s) => s.id !== action.payload); })
      .addCase(fetchAdminMaterials.pending, (state) => { state.loading = true; })
      .addCase(fetchAdminMaterials.fulfilled, (state, action) => { state.loading = false; state.materials = action.payload; })
      .addCase(fetchAdminMaterials.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(createMaterial.fulfilled, (state) => { state.error = null; })
      .addCase(updateMaterial.fulfilled, (state) => { state.error = null; })
      .addCase(deleteMaterial.fulfilled, (state, action) => { state.materials = state.materials.filter((m) => m.id !== action.payload); });
  },
});

export default studySlice.reducer;
