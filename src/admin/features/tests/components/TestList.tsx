import React from 'react';
import type { ITest } from '../../../types';
import { Button, Loader } from '@shared/components';
import { BookOpen, Plus, ChevronLeft, ChevronRight } from '@shared/icons';
import TestCard from './TestCard';

interface TestListProps {
  tests: ITest[];
  loading: boolean;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onEdit: (test: ITest) => void;
  onDelete: (test: ITest) => void;
  onContent: (test: ITest) => void;
  onDuplicate: (test: ITest) => void;
  emptyCreateHandler: () => void;
}

const TestList: React.FC<TestListProps> = ({
  tests,
  loading,
  totalPages,
  currentPage,
  onPageChange,
  onEdit,
  onDelete,
  onContent,
  onDuplicate,
  emptyCreateHandler,
}) => {
  if (loading) {
    return <div className="flex justify-center py-12"><Loader size="lg" /></div>;
  }

  if (tests.length === 0) {
    return (
      <div className="admin-card-solid">
        <div className="flex flex-col items-center justify-center py-16">
          <BookOpen className="w-12 h-12 text-tb-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-tb-navy dark:text-white mb-1">No tests found</h3>
          <p className="text-tb-gray-500 dark:text-gray-400 text-sm mb-4">Create your first test to get started</p>
          <Button onClick={emptyCreateHandler}><Plus className="w-4 h-4" />Create Test</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {tests.map((test: ITest) => (
          <TestCard
            key={test.id}
            test={test}
            onEdit={onEdit}
            onDelete={onDelete}
            onContent={onContent}
            onDuplicate={onDuplicate}
          />
        ))}
      </div>

      {totalPages > 1 && (
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
                        : 'text-tb-gray-500 dark:text-gray-400 hover:bg-tb-gray-100'
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
      )}
    </>
  );
};

export default TestList;
