import { createSelector } from '@reduxjs/toolkit';
import type { AdminRootState } from '../../../store/store';

const selectQuestionsState = (state: AdminRootState) => state.questions;

export const selectAdminQuestions = createSelector(selectQuestionsState, (s) => s.questions);
export const selectAdminQuestionsLoading = createSelector(selectQuestionsState, (s) => s.loading);
export const selectQuestionsPagination = createSelector(
  selectQuestionsState,
  (s) => ({ totalPages: s.totalPages, currentPage: s.currentPage, totalQuestions: s.totalQuestions })
);
