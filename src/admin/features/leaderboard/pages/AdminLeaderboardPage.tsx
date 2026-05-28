import React from 'react';
import { Button, Loader } from '@shared/components';
import { ChevronLeft, ChevronRight, Users } from '@shared/icons';
import PageHeader from '../../../components/PageHeader';
import { LeaderboardUserRow, LeaderboardControls } from '../components';
import { useLeaderboard } from '../hooks';

const AdminLeaderboardPage: React.FC = () => {
  const {
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
  } = useLeaderboard();

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Leaderboard" subtitle={`${total} total entries`} />

      <LeaderboardControls timeFilter={timeFilter} onTimeFilterChange={handleTimeFilterChange} />

      {loading ? (
        <div className="flex justify-center py-12"><Loader size="lg" /></div>
      ) : entries.length === 0 ? (
        <div className="admin-card-solid">
          <div className="flex flex-col items-center justify-center py-16">
            <Users className="w-12 h-12 text-tb-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-tb-navy dark:text-white mb-1">No leaderboard data</h3>
            <p className="text-tb-gray-500 dark:text-gray-400 text-sm">No entries found for the selected time period</p>
          </div>
        </div>
      ) : (
        <>
          <div className="admin-card-solid overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-tb-gray-100 bg-tb-gray-50/50">
                    <th className="text-left px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Rank</th>
                    <th className="text-left px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Name</th>
                    <th className="text-left px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Email</th>
                    <th className="text-left px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Total Score</th>
                    <th className="text-left px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Tests Completed</th>
                    <th className="text-left px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Avg Score</th>
                    <th className="text-left px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Last Active</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-tb-gray-100">
                  {entries.map((entry: any) => (
                    <LeaderboardUserRow key={entry.userId} entry={entry} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <p className="text-sm text-tb-gray-500 dark:text-gray-400">Page {page} of {totalPages}</p>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" disabled={page <= 1} onClick={() => handlePageChange(page - 1)}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
                  if (pageNum <= totalPages) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                          pageNum === page
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
                <Button variant="ghost" size="sm" disabled={!hasMore} onClick={() => handlePageChange(page + 1)}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminLeaderboardPage;
