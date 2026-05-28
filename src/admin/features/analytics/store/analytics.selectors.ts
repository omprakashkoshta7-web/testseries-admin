import type { AdminRootState } from '../../../store';

export const selectAdminAnalytics = (state: AdminRootState) => state.analytics.data;
export const selectAdminAnalyticsLoading = (state: AdminRootState) => state.analytics.loading;
