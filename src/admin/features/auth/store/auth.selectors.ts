import type { AdminRootState } from '../../../store';

export const selectAdminUser = (state: AdminRootState) => state.auth.user;
export const selectAdminAuth = (state: AdminRootState) => state.auth;
export const selectAdminLoading = (state: AdminRootState) => state.auth.isLoading;
export const selectAdminError = (state: AdminRootState) => state.auth.error;
