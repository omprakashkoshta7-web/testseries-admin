import React from 'react';
import { Loader } from '@shared/components';
import { Search } from '@shared/icons';
import type { IResult } from '../../../types';
import { ResultsTableRow } from './ResultsTableRow';
import { ResultsTablePagination } from './ResultsTablePagination';

interface ResultsTableProps {
  results: IResult[];
  loading: boolean;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results, loading, totalPages, currentPage, onPageChange }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader size="lg" />
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="admin-card-solid">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-20 h-20 bg-tb-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search className="w-10 h-10 text-tb-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-tb-navy dark:text-white mb-1">No results found</h3>
          <p className="text-tb-gray-500 dark:text-gray-400 text-sm">Try selecting a different test</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-card-solid overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-tb-gray-50/80">
              <th className="text-left py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
              <th className="text-left py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Test</th>
              <th className="text-center py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Score / Total</th>
              <th className="text-center py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Accuracy</th>
              <th className="text-center py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Time Taken</th>
              <th className="text-right py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Completed At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-tb-gray-50">
            {results.map((r: IResult) => (
              <ResultsTableRow key={r.id} result={r} />
            ))}
          </tbody>
        </table>
      </div>
      <ResultsTablePagination totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
    </div>
  );
};

export default ResultsTable;
