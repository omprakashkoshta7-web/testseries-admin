import type { AdminRootState } from '../../../store';

export const selectAdminDashboard = (state: AdminRootState) => state.dashboard.stats;
export const selectAdminDashboardLoading = (state: AdminRootState) => state.dashboard.loading;
