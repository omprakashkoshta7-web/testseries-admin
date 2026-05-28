import React from 'react';
import { useAdminSelector } from '../../../store/hooks';
import { useReports, useReportFilters } from '../hooks';
import {
  selectAdminResults,
  selectAdminResultsLoading,
  selectResultsPagination,
  selectRevenueReport,
  selectAttemptReport,
  selectReportsLoading,
  selectReportPeriod,
} from '../store/reports.selectors';
import {
  Target,
  DollarSign,
  BarChart3,
} from '@shared/icons';
import PageHeader from '../../../components/PageHeader';
import { ResultsTab, RevenueTab, AttemptsTab } from '../components';

const tabs: { key: 'results' | 'revenue' | 'attempts'; label: string; icon: React.FC<{ className?: string }> }[] = [
  { key: 'results', label: 'Results', icon: Target },
  { key: 'revenue', label: 'Revenue Report', icon: DollarSign },
  { key: 'attempts', label: 'Attempt Report', icon: BarChart3 },
];

const AdminReportsPage: React.FC = () => {
  const results = useAdminSelector(selectAdminResults);
  const resultsLoading = useAdminSelector(selectAdminResultsLoading);
  const { totalPages, currentPage, totalResults } = useAdminSelector(selectResultsPagination);
  const revenueReport = useAdminSelector(selectRevenueReport);
  const attemptReport = useAdminSelector(selectAttemptReport);
  const reportsLoading = useAdminSelector(selectReportsLoading);
  const period = useAdminSelector(selectReportPeriod);

  const {
    activeTab, setActiveTab,
    selectedTestId, setSelectedTestId,
    selectedAttemptTestId, setSelectedAttemptTestId,
    page, setPage,
  } = useReportFilters();

  const {
    tests,
    rankLoading,
    handleGenerateRanks,
    handleExportCsv,
  } = useReports(activeTab, selectedTestId, selectedAttemptTestId, page);

  const maxRevenue = Math.max(...revenueReport.map((r: any) => r.revenue), 1);
  const maxAttempts = Math.max(...attemptReport.map((r: any) => r.count), 1);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Reports" subtitle="View and export platform reports" />

      <div className="inline-flex items-center gap-1 p-1 bg-tb-gray-100 rounded-xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-white text-tb-navy dark:text-white shadow-sm'
                  : 'text-tb-gray-500 dark:text-gray-400 hover:text-tb-navy dark:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === 'results' && (
        <ResultsTab
          tests={tests}
          selectedTestId={selectedTestId}
          selectedAttemptTestId={selectedAttemptTestId}
          period={period}
          rankLoading={rankLoading}
          onTestChange={setSelectedTestId}
          onAttemptTestChange={setSelectedAttemptTestId}
          onPeriodChange={(p) => {}}
          onGenerateRanks={handleGenerateRanks}
          onExportCsv={handleExportCsv}
          results={results}
          resultsLoading={resultsLoading}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setPage}
        />
      )}

      {activeTab === 'revenue' && (
        <RevenueTab
          tests={tests}
          selectedTestId={selectedTestId}
          selectedAttemptTestId={selectedAttemptTestId}
          period={period}
          rankLoading={rankLoading}
          onTestChange={setSelectedTestId}
          onAttemptTestChange={setSelectedAttemptTestId}
          onPeriodChange={(p) => {}}
          onGenerateRanks={handleGenerateRanks}
          onExportCsv={handleExportCsv}
          revenueReport={revenueReport}
          reportsLoading={reportsLoading}
          maxRevenue={maxRevenue}
        />
      )}

      {activeTab === 'attempts' && (
        <AttemptsTab
          tests={tests}
          selectedTestId={selectedTestId}
          selectedAttemptTestId={selectedAttemptTestId}
          period={period}
          rankLoading={rankLoading}
          onTestChange={setSelectedTestId}
          onAttemptTestChange={setSelectedAttemptTestId}
          onPeriodChange={(p) => {}}
          onGenerateRanks={handleGenerateRanks}
          onExportCsv={handleExportCsv}
          attemptReport={attemptReport}
          reportsLoading={reportsLoading}
          maxAttempts={maxAttempts}
        />
      )}
    </div>
  );
};

export default AdminReportsPage;
