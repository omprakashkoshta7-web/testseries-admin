import type { AdminRootState } from '../../../store';

export const selectAdminTests = (state: AdminRootState) => state.tests.tests;
export const selectAdminTestsLoading = (state: AdminRootState) => state.tests.loading;
export const selectAdminTestDetail = (state: AdminRootState) => state.tests.testDetail;
export const selectTestsPagination = (state: AdminRootState) => ({
  totalPages: state.tests.totalPages,
  currentPage: state.tests.currentPage,
  totalTests: state.tests.totalTests,
});
