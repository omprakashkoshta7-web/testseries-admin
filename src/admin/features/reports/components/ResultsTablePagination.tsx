import React from 'react';
import { Button } from '@shared/components';
import { ChevronLeft, ChevronRight } from '@shared/icons';
import { usePaginationRange } from './useResultsTable';

interface ResultsTablePaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const ResultsTablePagination: React.FC<ResultsTablePaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const pageRange = usePaginationRange(totalPages, currentPage);
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-tb-gray-100 bg-tb-gray-50/50">
      <p className="text-sm text-tb-gray-500 dark:text-gray-400">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" disabled={currentPage <= 1} onClick={() => onPageChange(Math.max(1, currentPage - 1))}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        {pageRange.map((pageNum) => (
          <button key={pageNum} onClick={() => onPageChange(pageNum)}
            className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${pageNum === currentPage ? 'bg-tb-blue text-white shadow-sm' : 'text-tb-gray-500 dark:text-gray-400 hover:bg-tb-gray-100'}`}>
            {pageNum}
          </button>
        ))}
        <Button variant="ghost" size="sm" disabled={currentPage >= totalPages} onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ResultsTablePagination;
