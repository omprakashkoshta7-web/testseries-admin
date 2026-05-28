import React from 'react';
import { Button } from '@shared/components';
import { ChevronLeft, ChevronRight } from '@shared/icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between pt-2">
      <p className="text-sm text-tb-gray-500 dark:text-gray-400">Page {currentPage} of {totalPages}</p>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" disabled={currentPage <= 1} onClick={() => onPageChange(Math.max(1, currentPage - 1))}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          const pageNum = Math.max(1, Math.min(currentPage - 2, totalPages - 4)) + i;
          if (pageNum <= totalPages) {
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                  pageNum === currentPage
                    ? 'bg-tb-blue text-white shadow-sm'
                    : 'text-tb-gray-500 dark:text-gray-400 hover:bg-tb-gray-100 dark:hover:bg-gray-700/50'
                }`}
              >
                {pageNum}
              </button>
            );
          }
          return null;
        })}
        <Button variant="ghost" size="sm" disabled={currentPage >= totalPages} onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
