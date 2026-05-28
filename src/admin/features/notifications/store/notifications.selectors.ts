import { createSelector } from '@reduxjs/toolkit';
import type { AdminRootState } from '../../../store/store';

const selectNotificationsState = (state: AdminRootState) => state.notifications;

export const selectAdminNotifications = createSelector(selectNotificationsState, (s) => s.notifications);
export const selectAdminNotificationsLoading = createSelector(selectNotificationsState, (s) => s.loading);
export const selectNotificationsPagination = createSelector(
  selectNotificationsState,
  (s) => ({ totalPages: s.totalPages, currentPage: s.currentPage, totalNotifications: s.totalNotifications })
);
