import React from 'react';
import { TIME_FILTERS, TIME_FILTER_LABELS } from '../constants';

interface Props {
  timeFilter: string;
  onTimeFilterChange: (value: string) => void;
}

const LeaderboardControls: React.FC<Props> = ({ timeFilter, onTimeFilterChange }) => {
  return (
    <div className="admin-card-solid p-4">
      <div className="flex gap-2">
        {TIME_FILTERS.map((opt) => (
          <button
            key={opt}
            onClick={() => onTimeFilterChange(opt)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              timeFilter === opt
                ? 'bg-tb-blue text-white shadow-sm'
                : 'text-tb-gray-500 dark:text-gray-400 hover:bg-tb-gray-100 dark:hover:bg-gray-700/50'
            }`}
          >
            {TIME_FILTER_LABELS[opt]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardControls;
