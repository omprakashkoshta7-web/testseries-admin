import { createSelector } from '@reduxjs/toolkit';
import type { AdminRootState } from '../../../store/store';

const selectActivityLogsState = (state: AdminRootState) => state.activityLogs;

export const selectAdminActivityLogs = createSelector(selectActivityLogsState, (s) => s.logs);
export const selectAdminActivityLogsLoading = createSelector(selectActivityLogsState, (s) => s.loading);
export const selectActivityLogsPagination = createSelector(
  selectActivityLogsState,
  (s) => ({ totalPages: s.totalPages, currentPage: s.currentPage, totalLogs: s.totalLogs })
);
