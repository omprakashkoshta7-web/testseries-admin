import { createSelector } from '@reduxjs/toolkit';
import type { AdminRootState } from '../../../store/store';

const selectEnrollmentsState = (state: AdminRootState) => state.enrollments;

export const selectEnrollments = createSelector(selectEnrollmentsState, (s) => s.enrollments);
export const selectEnrollmentsTotal = createSelector(selectEnrollmentsState, (s) => s.total);
export const selectEnrollmentsLoading = createSelector(selectEnrollmentsState, (s) => s.loading);
