import React from 'react';
import { Select, Button } from '@shared/components';
import { Award, Download, Filter } from '@shared/icons';
import type { ITest } from '../../../types';

const periods = [
  { value: '7d', label: '7 Days' },
  { value: '30d', label: '30 Days' },
  { value: '90d', label: '90 Days' },
  { value: '1y', label: '1 Year' },
];

interface ReportFiltersProps {
  tab: 'results' | 'revenue' | 'attempts';
  tests: ITest[];
  selectedTestId: string;
  selectedAttemptTestId: string;
  period: string;
  rankLoading: boolean;
  onTestChange: (value: string) => void;
  onAttemptTestChange: (value: string) => void;
  onPeriodChange: (period: string) => void;
  onGenerateRanks: () => void;
  onExportCsv: () => void;
}

const ReportFilters: React.FC<ReportFiltersProps> = ({
  tab,
  tests,
  selectedTestId,
  selectedAttemptTestId,
  period,
  rankLoading,
  onTestChange,
  onAttemptTestChange,
  onPeriodChange,
  onGenerateRanks,
  onExportCsv,
}) => {
  if (tab === 'results') {
    return (
      <div className="admin-card-solid p-4">
        <div className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="w-full sm:w-72">
            <Select
              options={[
                { value: '', label: 'All Tests' },
                ...tests.map((t) => ({ value: t.id, label: t.title })),
              ]}
              value={selectedTestId}
              onChange={(e) => onTestChange(e.target.value)}
            />
          </div>
          <div className="flex gap-2 ml-auto">
            <Button
              variant="primary"
              size="sm"
              onClick={onGenerateRanks}
              disabled={!selectedTestId || rankLoading}
              isLoading={rankLoading}
            >
              <Award className="w-4 h-4" />
              Generate Ranks
            </Button>
            <Button variant="secondary" size="sm" onClick={onExportCsv}>
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (tab === 'revenue') {
    return (
      <div className="admin-card-solid p-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-tb-gray-400" />
          {periods.map((p) => (
            <button
              key={p.value}
              onClick={() => onPeriodChange(p.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                period === p.value
                  ? 'bg-tb-blue text-white shadow-sm'
                  : 'bg-tb-gray-100 text-tb-gray-600 dark:text-gray-300 hover:bg-tb-gray-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-card-solid p-4">
      <div className="w-full sm:w-72">
        <Select
          options={[
            { value: '', label: 'All Tests' },
            ...tests.map((t) => ({ value: t.id, label: t.title })),
          ]}
          value={selectedAttemptTestId}
          onChange={(e) => onAttemptTestChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ReportFilters;
