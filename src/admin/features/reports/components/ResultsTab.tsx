import React from 'react';
import { ReportFilters, ResultsTable } from '../components';

interface ResultsTabProps {
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
  results: any[];
  resultsLoading: boolean;
  totalPages: number;
  currentPage: number;
  onPageChange: (p: number) => void;
}

const ResultsTab: React.FC<ResultsTabProps> = ({
  tests, selectedTestId, selectedAttemptTestId, period, rankLoading,
  onTestChange, onAttemptTestChange, onPeriodChange, onGenerateRanks, onExportCsv,
  results, resultsLoading, totalPages, currentPage, onPageChange,
}) => (
  <div className="space-y-4">
    <ReportFilters
      tab="results"
      tests={tests}
      selectedTestId={selectedTestId}
      selectedAttemptTestId={selectedAttemptTestId}
      period={period}
      rankLoading={rankLoading}
      onTestChange={onTestChange}
      onAttemptTestChange={onAttemptTestChange}
      onPeriodChange={onPeriodChange}
      onGenerateRanks={onGenerateRanks}
      onExportCsv={onExportCsv}
    />
    <ResultsTable
      results={results}
      loading={resultsLoading}
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={onPageChange}
    />
  </div>
);

export default ResultsTab;
