import type { AdminRootState } from '../../../store';

export const selectAdminUsers = (state: AdminRootState) => state.users.users;
export const selectAdminUsersLoading = (state: AdminRootState) => state.users.loading;
export const selectUserDetails = (state: AdminRootState) => state.users.userDetail;
export const selectUsersPagination = (state: AdminRootState) => ({
  totalPages: state.users.totalPages,
  currentPage: state.users.currentPage,
  totalUsers: state.users.totalUsers,
});
