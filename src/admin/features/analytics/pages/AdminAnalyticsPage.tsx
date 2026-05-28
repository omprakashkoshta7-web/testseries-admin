import React from 'react';
import { Loader } from '@shared/components';
import { BarChart3 } from '@shared/icons';
import { useAnalytics } from '../hooks/useAnalytics';
import AnalyticsStatCards from '../components/AnalyticsStatCards';
import AnalyticsCharts from '../components/AnalyticsCharts';
import AnalyticsPeriodFilter from '../components/AnalyticsPeriodFilter';
import PageHeader from '../../../components/PageHeader';

const AdminAnalyticsPage: React.FC = () => {
  const { period, setPeriod, stats, loading } = useAnalytics();

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Analytics"
        subtitle="Platform performance and growth metrics"
        actions={
          <AnalyticsPeriodFilter period={period} onChange={setPeriod} />
        }
      />

      {loading ? (
        <div className="flex justify-center py-12"><Loader size="lg" /></div>
      ) : stats ? (
        <>
          <AnalyticsStatCards analytics={stats} />
          <AnalyticsCharts analytics={stats} />
        </>
      ) : (
        <div className="admin-card-solid">
          <div className="flex flex-col items-center justify-center py-16">
            <BarChart3 className="w-12 h-12 text-tb-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-tb-navy dark:text-white mb-1">No analytics data</h3>
            <p className="text-tb-gray-500 dark:text-gray-400 text-sm">Data will appear once the platform has activity</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnalyticsPage;
