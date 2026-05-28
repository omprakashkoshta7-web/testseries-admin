import { useMemo } from 'react';
import type { IResult } from '../../../types';

export function useResultRow(result: IResult) {
  return useMemo(() => ({
    userInitial: result.userName?.charAt(0)?.toUpperCase() ?? '?',
    accuracyClass:
      result.accuracy >= 80
        ? 'bg-green-50 text-green-700'
        : result.accuracy >= 50
          ? 'bg-yellow-50 text-yellow-700'
          : 'bg-red-50 text-red-700',
    formattedTime: `${Math.floor(result.timeTaken / 60)}m ${result.timeTaken % 60}s`,
    formattedDate: new Date(result.completedAt).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit',
    }),
  }), [result]);
}

export function usePaginationRange(totalPages: number, currentPage: number) {
  return useMemo(() => {
    const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
    return Array.from({ length: Math.min(totalPages, 5) }, (_, i) => start + i).filter(p => p <= totalPages);
  }, [totalPages, currentPage]);
}
