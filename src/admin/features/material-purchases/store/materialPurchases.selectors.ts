import { createSelector } from '@reduxjs/toolkit';
import type { AdminRootState } from '../../../store/store';

const selectMaterialPurchasesState = (state: AdminRootState) => state.materialPurchases;

export const selectMaterialPurchases = createSelector(selectMaterialPurchasesState, (s) => s.purchases);
export const selectMaterialPurchasesTotal = createSelector(selectMaterialPurchasesState, (s) => s.total);
export const selectMaterialPurchasesLoading = createSelector(selectMaterialPurchasesState, (s) => s.loading);
