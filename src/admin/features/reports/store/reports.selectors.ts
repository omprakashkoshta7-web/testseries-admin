import { createSelector } from '@reduxjs/toolkit';
import type { AdminRootState } from '../../../store/store';

const selectResultsState = (state: AdminRootState) => state.results;
const selectReportsState = (state: AdminRootState) => state.reports;

export const selectAdminResults = createSelector(selectResultsState, (s) => s.results);
export const selectAdminResultsLoading = createSelector(selectResultsState, (s) => s.loading);
export const selectResultsPagination = createSelector(
  selectResultsState,
  (s) => ({ totalPages: s.totalPages, currentPage: s.currentPage, totalResults: s.totalResults })
);

export const selectRevenueReport = createSelector(selectReportsState, (s) => s.revenueReport);
export const selectAttemptReport = createSelector(selectReportsState, (s) => s.attemptReport);
export const selectReportsLoading = createSelector(selectReportsState, (s) => s.loading);
export const selectReportPeriod = createSelector(selectReportsState, (s) => s.period);
