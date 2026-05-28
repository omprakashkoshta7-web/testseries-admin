import { useEffect, useState, useCallback } from 'react';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { fetchTickets } from '../store/tickets.slice';
import { selectAdminTickets, selectAdminTicketsLoading, selectTicketsPagination } from '../store/tickets.selectors';
import type { ITicketFilter } from '../../../types';

export const useTicketsList = () => {
  const dispatch = useAdminDispatch();
  const tickets = useAdminSelector(selectAdminTickets);
  const loading = useAdminSelector(selectAdminTicketsLoading);
  const { totalPages, currentPage, totalTickets } = useAdminSelector(selectTicketsPagination);
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);

  const loadTickets = useCallback(() => {
    const filters: ITicketFilter = {};
    if (statusFilter) filters.status = statusFilter;
    filters.page = page;
    filters.limit = 10;
    dispatch(fetchTickets(filters));
  }, [dispatch, statusFilter, page]);

  useEffect(() => { loadTickets(); }, [loadTickets]);
  useEffect(() => { setPage(1); }, [statusFilter]);

  return { tickets, loading, statusFilter, setStatusFilter, page, setPage, totalPages, currentPage, totalTickets };
};
