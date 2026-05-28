import React from 'react';
import type { IAnalyticsData } from '../../../types';
import { useChartOptions } from './useChartOptions';
import { RevenueChart } from './RevenueChart';
import { UserGrowthChart } from './UserGrowthChart';
import { TestsTakenChart } from './TestsTakenChart';
import { TopExamsChart } from './TopExamsChart';
import { SummaryCards } from './SummaryCards';

interface AnalyticsChartsProps {
  analytics: IAnalyticsData | null;
}

const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ analytics }) => {
  const { maxRevenue, maxUsers, maxTestsTaken } = useChartOptions(analytics);
  if (!analytics) return null;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={analytics.revenueData || []} maxRevenue={maxRevenue} />
        <UserGrowthChart data={analytics.userGrowth || []} maxUsers={maxUsers} />
        <TestsTakenChart data={analytics.testsTaken || []} maxTestsTaken={maxTestsTaken} />
        <TopExamsChart data={analytics.topExams || []} />
      </div>
      <SummaryCards analytics={analytics} />
    </>
  );
};

export default AnalyticsCharts;
