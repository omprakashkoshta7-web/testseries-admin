import { createSelector } from '@reduxjs/toolkit';
import type { AdminRootState } from '../../../store/store';

const selectBookmarksState = (state: AdminRootState) => state.bookmarks;

export const selectBookmarksUsers = createSelector(selectBookmarksState, (s) => s.users);
export const selectBookmarksTotal = createSelector(selectBookmarksState, (s) => s.totalBookmarks);
export const selectBookmarksLoading = createSelector(selectBookmarksState, (s) => s.loading);
