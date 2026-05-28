import { createSelector } from '@reduxjs/toolkit';
import type { AdminRootState } from '../../../store/store';

const selectTicketsState = (state: AdminRootState) => state.tickets;

export const selectAdminTickets = createSelector(selectTicketsState, (s) => s.tickets);
export const selectAdminTicketDetail = createSelector(selectTicketsState, (s) => s.ticketDetail);
export const selectAdminTicketsLoading = createSelector(selectTicketsState, (s) => s.loading);
export const selectTicketsPagination = createSelector(
  selectTicketsState,
  (s) => ({ totalPages: s.totalPages, currentPage: s.currentPage, totalTickets: s.totalTickets })
);
