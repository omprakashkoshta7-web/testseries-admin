import React from 'react';
import DeleteAllButton from '../../../components/DeleteAllButton';
import PageHeader from '../../../components/PageHeader';
import { Loader, Input } from '@shared/components';
import { Search, Users, BookOpen } from '@shared/icons';
import { useEnrollments } from '../hooks/useEnrollments';
import { EnrollmentRow, EnrollmentFilters } from '../components';

const AdminEnrollmentsPage: React.FC = () => {
  const { total, loading, search, setSearch, filtered } = useEnrollments();

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Enrollments" subtitle={`${total} total enrollments`} actions={<DeleteAllButton resource="enrollments" displayName="Enrollments" />} />
      <EnrollmentFilters search={search} onSearchChange={setSearch} />
      {loading ? (
        <div className="flex justify-center py-12"><Loader size="lg" /></div>
      ) : filtered.length === 0 ? (
        <div className="admin-card-solid"><div className="flex flex-col items-center justify-center py-16"><BookOpen className="w-12 h-12 text-tb-gray-300 mb-4" /><h3 className="text-lg font-semibold text-tb-navy dark:text-white mb-1">No enrollments found</h3><p className="text-tb-gray-500 dark:text-gray-400 text-sm">No users have enrolled in any tests yet.</p></div></div>
      ) : (
        <div className="admin-card-solid overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-tb-gray-100 bg-tb-gray-50/50">
                  <th className="text-left px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">User</th>
                  <th className="text-left px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Email</th>
                  <th className="text-left px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Test</th>
                  <th className="text-left px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Category</th>
                  <th className="text-right px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Enrolled At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tb-gray-100">
                {filtered.map((e) => (
                  <EnrollmentRow key={e._id} enrollment={e} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnrollmentsPage;
