import { createSelector } from '@reduxjs/toolkit';
import type { AdminRootState } from '../../../store/store';

const selectAnnouncementsState = (state: AdminRootState) => state.announcements;

export const selectAdminAnnouncements = createSelector(selectAnnouncementsState, (s) => s.announcements);
export const selectAdminAnnouncementsLoading = createSelector(selectAnnouncementsState, (s) => s.loading);
