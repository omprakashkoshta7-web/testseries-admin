import { createSelector } from '@reduxjs/toolkit';
import type { AdminRootState } from '../../../store/store';

const selectCouponsState = (state: AdminRootState) => state.coupons;

export const selectAdminCoupons = createSelector(selectCouponsState, (s) => s.coupons);
export const selectAdminCouponsLoading = createSelector(selectCouponsState, (s) => s.loading);
