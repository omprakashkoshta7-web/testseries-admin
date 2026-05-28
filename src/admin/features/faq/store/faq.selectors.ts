import { createSelector } from '@reduxjs/toolkit';
import type { AdminRootState } from '../../../store/store';

const selectFaqState = (state: AdminRootState) => state.faq;

export const selectAdminFaqs = createSelector(selectFaqState, (s) => s.faqs);
export const selectAdminFaqsLoading = createSelector(selectFaqState, (s) => s.loading);
