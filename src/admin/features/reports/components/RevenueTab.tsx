import React from 'react';
import { useAdminDispatch } from '../../../store/hooks';
import { fetchRevenueReport } from '../store/reports.slice';
import { ReportFilters, RevenueTable } from '../components';
import { Loader } from '@shared/components';
import { DollarSign, TrendingUp } from '@shared/icons';
import type { IRevenueReport } from '../../../types';

interface RevenueTabProps {
  tests: any[];
  selectedTestId: string;
  selectedAttemptTestId: string;
  period: string;
  rankLoading: boolean;
  onTestChange: (id: string) => void;
  onAttemptTestChange: (id: string) => void;
  onPeriodChange: (p: string) => void;
  onGenerateRanks: () => void;
  onExportCsv: () => void;
  revenueReport: IRevenueReport[];
  reportsLoading: boolean;
  maxRevenue: number;
}

const RevenueTab: React.FC<RevenueTabProps> = ({
  tests, selectedTestId, selectedAttemptTestId, period, rankLoading,
  onTestChange, onAttemptTestChange, onPeriodChange, onGenerateRanks, onExportCsv,
  revenueReport, reportsLoading, maxRevenue,
}) => {
  const dispatch = useAdminDispatch();

  return (
    <div className="space-y-4">
      <ReportFilters
        tab="revenue"
        tests={tests}
        selectedTestId={selectedTestId}
        selectedAttemptTestId={selectedAttemptTestId}
        period={period}
        rankLoading={rankLoading}
        onTestChange={onTestChange}
        onAttemptTestChange={onAttemptTestChange}
        onPeriodChange={(p) => dispatch(fetchRevenueReport(p))}
        onGenerateRanks={onGenerateRanks}
        onExportCsv={onExportCsv}
      />

      {reportsLoading ? (
        <div className="flex justify-center py-12">
          <Loader size="lg" />
        </div>
      ) : revenueReport.length === 0 ? (
        <div className="admin-card-solid">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 bg-tb-gray-100 rounded-full flex items-center justify-center mb-4">
              <DollarSign className="w-10 h-10 text-tb-gray-300" />
            </div>
            <h3 className="text-lg font-semibold text-tb-navy dark:text-white mb-1">No revenue data</h3>
            <p className="text-tb-gray-500 dark:text-gray-400 text-sm">No revenue data available for this period</p>
          </div>
        </div>
      ) : (
        <div className="admin-card-solid p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-tb-blue" />
            <h3 className="text-lg font-semibold text-tb-navy dark:text-white">Revenue Overview</h3>
          </div>

          <div className="overflow-x-auto">
            <div className="flex items-end gap-2 min-w-[600px]" style={{ height: 200 }}>
              {revenueReport.map((item: IRevenueReport, idx: number) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs font-semibold text-tb-navy dark:text-white">₹{item.revenue}</span>
                  <div
                    className="w-full bg-gradient-to-t from-admin-primary to-indigo-400 rounded-t-md transition-all hover:opacity-80"
                    style={{ height: `${Math.max((item.revenue / maxRevenue) * 160, 4)}px` }}
                  />
                  <span className="text-[10px] text-tb-gray-500 dark:text-gray-400 truncate w-full text-center">
                    {new Date(item._id).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <RevenueTable revenueReport={revenueReport} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RevenueTab;
