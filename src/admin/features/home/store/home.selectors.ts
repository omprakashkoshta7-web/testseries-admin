import { createSelector } from '@reduxjs/toolkit';
import type { AdminRootState } from '../../../store/store';

const selectHomeContentState = (state: AdminRootState) => state.homeContent;

export const selectHomeContentItems = createSelector(selectHomeContentState, (s) => s.items);
export const selectHomeContentLoading = createSelector(selectHomeContentState, (s) => s.loading);
