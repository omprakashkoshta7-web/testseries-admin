import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader, Button } from '@shared/components';
import { ChevronLeft, ChevronRight, MessageSquare } from '@shared/icons';
import DeleteAllButton from '../../../components/DeleteAllButton';
import PageHeader from '../../../components/PageHeader';
import { useTicketsList } from '../hooks/useTicketsList';
import TicketFilters from '../components/TicketFilters';
import TicketRow from '../components/TicketRow';

const AdminTicketsPage: React.FC = () => {
  const navigate = useNavigate();
  const { tickets, loading, statusFilter, setStatusFilter, page, setPage, totalPages, currentPage, totalTickets } = useTicketsList();

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Support Tickets" subtitle={`${totalTickets} ${totalTickets === 1 ? 'ticket' : 'tickets'} on the platform`} actions={<DeleteAllButton resource="tickets" displayName="Tickets" />} />

      <TicketFilters statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} />

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader size="lg" />
        </div>
      ) : tickets.length === 0 ? (
        <div className="admin-card-solid">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 bg-tb-gray-100 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="w-10 h-10 text-tb-gray-300" />
            </div>
            <h3 className="text-lg font-semibold text-tb-navy dark:text-white mb-1">No tickets found</h3>
            <p className="text-tb-gray-500 dark:text-gray-400 text-sm">Try adjusting your filter criteria</p>
          </div>
        </div>
      ) : (
        <div className="admin-card-solid overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-tb-gray-50/80">
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Subject / User</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="text-center py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Priority</th>
                  <th className="text-center py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="text-center py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Messages</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tb-gray-50">
                {tickets.map((ticket) => (
                  <TicketRow key={ticket.id} ticket={ticket} onNavigate={(id) => navigate(`/admin/tickets/${id}`)} />
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-tb-gray-100 bg-tb-gray-50/50">
              <p className="text-sm text-tb-gray-500 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={currentPage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(currentPage - 2, totalPages - 4)) + i;
                  if (pageNum <= totalPages) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
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
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={currentPage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminTicketsPage;
