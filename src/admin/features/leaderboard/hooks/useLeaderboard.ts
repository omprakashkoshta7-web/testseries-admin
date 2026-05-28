import { useEffect, useCallback } from 'react';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { fetchLeaderboard, setTimeFilter } from '../store/leaderboard.slice';

export const useLeaderboard = () => {
  const dispatch = useAdminDispatch();
  const { entries, total, page, limit, hasMore, loading, timeFilter } = useAdminSelector(
    (state: any) => state.leaderboard
  );

  const loadLeaderboard = useCallback(() => {
    dispatch(fetchLeaderboard({ page, limit, timeFilter }));
  }, [dispatch, page, limit, timeFilter]);

  useEffect(() => { loadLeaderboard(); }, [loadLeaderboard]);

  const handleTimeFilterChange = (filter: string) => {
    dispatch(setTimeFilter(filter));
  };

  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (newPage: number) => {
    dispatch(fetchLeaderboard({ page: newPage, limit, timeFilter }));
  };

  return {
    entries,
    total,
    page,
    limit,
    hasMore,
    loading,
    timeFilter,
    totalPages,
    handleTimeFilterChange,
    handlePageChange,
  };
};
