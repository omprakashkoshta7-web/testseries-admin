import { useEffect } from 'react';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { fetchAdminDashboard } from '../store/dashboard.slice';
import { selectAdminDashboard, selectAdminDashboardLoading } from '../store/dashboard.selectors';

export const useDashboard = () => {
  const dispatch = useAdminDispatch();
  const stats = useAdminSelector(selectAdminDashboard);
  const loading = useAdminSelector(selectAdminDashboardLoading);

  useEffect(() => {
    dispatch(fetchAdminDashboard());
  }, [dispatch]);

  return { stats, loading };
};
