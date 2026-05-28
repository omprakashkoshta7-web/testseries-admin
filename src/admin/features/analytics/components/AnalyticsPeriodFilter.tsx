import React from 'react';
import { ANALYTICS_PERIOD_FILTERS } from '../constants';

interface AnalyticsPeriodFilterProps {
  period: string;
  onChange: (value: string) => void;
}

const AnalyticsPeriodFilter: React.FC<AnalyticsPeriodFilterProps> = ({ period, onChange }) => (
  <div className="inline-flex items-center gap-1 p-1 bg-tb-gray-100 dark:bg-gray-700/50 rounded-xl">
    {ANALYTICS_PERIOD_FILTERS.map((p) => (
      <button
        key={p.value}
        onClick={() => onChange(p.value)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          period === p.value
            ? 'bg-white dark:bg-gray-800 text-tb-navy dark:text-white shadow-sm'
            : 'text-tb-gray-500 dark:text-gray-400 hover:text-tb-navy dark:text-white dark:hover:text-white'
        }`}
      >
        {p.label}
      </button>
    ))}
  </div>
);

export default AnalyticsPeriodFilter;
