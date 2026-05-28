import React from 'react';
import { Loader, Button } from '@shared/components';
import { ChevronLeft, ChevronRight, Users } from '@shared/icons';
import type { IUser } from '../../../types';
import UserRow from './UserRow';

interface UsersTableProps {
  users: IUser[];
  loading: boolean;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onEditStatus: (id: string) => void;
  onDelete: (id: string, name: string) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, loading, totalPages, currentPage, onPageChange, onEditStatus, onDelete }) => {
  if (loading) {
    return <div className="flex justify-center py-12"><Loader size="lg" /></div>;
  }

  if (users.length === 0) {
    return (
      <div className="admin-card-solid">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-20 h-20 bg-tb-gray-100 rounded-full flex items-center justify-center mb-4">
            <Users className="w-10 h-10 text-tb-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-tb-navy dark:text-white mb-1">No users found</h3>
          <p className="text-tb-gray-500 dark:text-gray-400 text-sm">Try adjusting your search or filter criteria</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-card-solid overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-tb-gray-50/80 dark:bg-gray-800/50">
              <th className="text-left py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Name / Email</th>
              <th className="text-left py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Phone</th>
              <th className="text-left py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
              <th className="text-center py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Tests</th>
              <th className="text-center py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th className="text-left py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Joined</th>
              <th className="text-right py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-tb-gray-50">
            {users.map((user: IUser) => (
              <UserRow key={user.id} user={user} onEditStatus={(id) => onEditStatus(id)} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-tb-gray-100 bg-tb-gray-50/50 dark:bg-gray-800/30">
          <p className="text-sm text-tb-gray-500 dark:text-gray-400">Page {currentPage} of {totalPages}</p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" disabled={currentPage <= 1} onClick={() => onPageChange(Math.max(1, currentPage - 1))}><ChevronLeft className="w-4 h-4" /></Button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const pageNum = Math.max(1, Math.min(currentPage - 2, totalPages - 4)) + i;
              if (pageNum <= totalPages) {
                return (
                  <button key={pageNum} onClick={() => onPageChange(pageNum)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${pageNum === currentPage ? 'bg-tb-blue text-white shadow-sm' : 'text-tb-gray-500 dark:text-gray-400 hover:bg-tb-gray-100 dark:hover:bg-gray-700/50'}`}>
                    {pageNum}
                  </button>
                );
              }
              return null;
            })}
            <Button variant="ghost" size="sm" disabled={currentPage >= totalPages} onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
