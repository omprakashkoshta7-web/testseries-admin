import { createSelector } from '@reduxjs/toolkit';
import type { AdminRootState } from '../../../store/store';

const selectBannersState = (state: AdminRootState) => state.banners;

export const selectAdminBanners = createSelector(selectBannersState, (s) => s.banners);
export const selectAdminBannersLoading = createSelector(selectBannersState, (s) => s.loading);
