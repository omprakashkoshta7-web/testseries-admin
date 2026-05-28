import React from 'react';
import { Button, Loader } from '@shared/components';
import {
  Activity,
  ChevronLeft,
  ChevronRight,
} from '@shared/icons';
import PageHeader from '../../../components/PageHeader';
import { ActivityLogRow } from '../components';
import { useActivityLogs } from '../hooks';

const AdminActivityLogsPage: React.FC = () => {
  const {
    logs,
    loading,
    totalPages,
    currentPage,
    totalLogs,
    page,
    handlePageChange,
  } = useActivityLogs();

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Activity Logs" subtitle={`${totalLogs} ${totalLogs === 1 ? 'entry' : 'entries'} recorded`} />

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader size="lg" />
        </div>
      ) : logs.length === 0 ? (
        <div className="admin-card-solid">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 bg-tb-gray-100 rounded-full flex items-center justify-center mb-4">
              <Activity className="w-10 h-10 text-tb-gray-300" />
            </div>
            <h3 className="text-lg font-semibold text-tb-navy dark:text-white mb-1">No activity logs found</h3>
            <p className="text-tb-gray-500 dark:text-gray-400 text-sm">No activity has been recorded yet</p>
          </div>
        </div>
      ) : (
        <div className="admin-card-solid overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-tb-gray-50/80">
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Resource</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Resource ID</th>
                  <th className="text-right py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tb-gray-50">
                {logs.map((log: any) => (
                  <ActivityLogRow key={log._id} log={log} />
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
                  onClick={() => handlePageChange(Math.max(1, page - 1))}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(currentPage - 2, totalPages - 4)) + i;
                  if (pageNum <= totalPages) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
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
                  onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
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

export default AdminActivityLogsPage;
