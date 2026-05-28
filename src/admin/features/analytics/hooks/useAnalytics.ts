import { useEffect, useState } from 'react';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { fetchAnalytics } from '../store/analytics.slice';
import { selectAdminAnalytics, selectAdminAnalyticsLoading } from '../store/analytics.selectors';

export const useAnalytics = () => {
  const dispatch = useAdminDispatch();
  const stats = useAdminSelector(selectAdminAnalytics);
  const loading = useAdminSelector(selectAdminAnalyticsLoading);
  const [period, setPeriod] = useState('30d');

  useEffect(() => {
    dispatch(fetchAnalytics(period));
  }, [dispatch, period]);

  return { period, setPeriod, stats, loading };
};
