import React from 'react';
import PageHeader from '../../../components/PageHeader';
import { Loader, Input } from '@shared/components';
import { Bookmark, Search } from '@shared/icons';
import { useBookmarks } from '../hooks/useBookmarks';
import { BookmarkRow } from '../components';

const AdminBookmarksPage: React.FC = () => {
  const { totalBookmarks, loading, search, setSearch, filtered } = useBookmarks();

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Bookmarks" subtitle={`${totalBookmarks} total bookmarks`} />

      <div className="admin-card-solid p-4">
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search className="w-4 h-4" />}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader size="lg" /></div>
      ) : filtered.length === 0 ? (
        <div className="admin-card-solid">
          <div className="flex flex-col items-center justify-center py-16">
            <Bookmark className="w-12 h-12 text-tb-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-tb-navy dark:text-white mb-1">No bookmarks found</h3>
            <p className="text-tb-gray-500 dark:text-gray-400 text-sm">No users have bookmarked questions yet.</p>
          </div>
        </div>
      ) : (
        <div className="admin-card-solid overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-tb-gray-100 bg-tb-gray-50/50">
                  <th className="text-left px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">User Name</th>
                  <th className="text-left px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Email</th>
                  <th className="text-left px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Bookmarked Questions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tb-gray-100">
                {filtered.map((u) => (
                  <BookmarkRow key={u._id} user={u} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookmarksPage;
