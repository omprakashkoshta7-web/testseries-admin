import { useMemo } from 'react';
import { useAdminSelector } from '../../../store/hooks';
import { selectAdminUsers } from '../store/users.selectors';
import { selectUsersPagination } from '../store/users.selectors';

export const useUserSummary = () => {
  const users = useAdminSelector(selectAdminUsers);
  const { totalUsers } = useAdminSelector(selectUsersPagination);

  const summary = useMemo(() => ({
    totalUsers,
    activeUsers: users.filter((u: any) => u.status === 'active' || !u.status).length,
    inactiveUsers: users.filter((u: any) => u.status === 'inactive').length,
    adminUsers: users.filter((u: any) => u.role === 'admin').length,
    userCount: users.filter((u: any) => u.role === 'user').length,
  }), [users, totalUsers]);

  return summary;
};
