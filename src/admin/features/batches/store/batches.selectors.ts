import { createSelector } from '@reduxjs/toolkit';
import type { AdminRootState } from '../../../store/store';

const selectBatchesState = (state: AdminRootState) => state.batches;

export const selectAdminBatches = createSelector(selectBatchesState, (s) => s.batches);
export const selectAdminGroups = createSelector(selectBatchesState, (s) => s.groups);
export const selectAdminBatchesLoading = createSelector(selectBatchesState, (s) => s.loading);
