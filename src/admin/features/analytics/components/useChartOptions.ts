import { useMemo } from 'react';
import type { IAnalyticsData } from '../../../types';

export function useChartOptions(analytics: IAnalyticsData | null) {
  return useMemo(() => {
    if (!analytics) return { maxRevenue: 1, maxUsers: 1, maxTestsTaken: 1 };

    const maxRevenue = analytics.revenueData ? Math.max(...analytics.revenueData.map(r => r.revenue), 1) : 1;
    const maxUsers = analytics.userGrowth ? Math.max(...analytics.userGrowth.map(u => u.totalUsers), 1) : 1;
    const maxTestsTaken = analytics.testsTaken
      ? Math.max(...analytics.testsTaken.map((t: any) => (typeof t === 'number' ? t : t?.count ?? 0)), 1)
      : 1;

    return { maxRevenue, maxUsers, maxTestsTaken };
  }, [analytics]);
}
