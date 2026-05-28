import { useEffect, useState, useCallback } from 'react';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { fetchActivityLogs } from '../store/activityLogs.slice';
import { selectAdminActivityLogs, selectAdminActivityLogsLoading, selectActivityLogsPagination } from '../store/activityLogs.selectors';

export const useActivityLogs = () => {
  const dispatch = useAdminDispatch();
  const logs = useAdminSelector(selectAdminActivityLogs);
  const loading = useAdminSelector(selectAdminActivityLogsLoading);
  const { totalPages, currentPage, totalLogs } = useAdminSelector(selectActivityLogsPagination);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const loadLogs = useCallback(() => {
    dispatch(fetchActivityLogs({ page, limit: 20 }));
  }, [dispatch, page]);

  useEffect(() => { loadLogs(); }, [loadLogs]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return {
    logs,
    loading,
    totalPages,
    currentPage,
    totalLogs,
    page,
    search,
    setSearch,
    handlePageChange,
  };
};
