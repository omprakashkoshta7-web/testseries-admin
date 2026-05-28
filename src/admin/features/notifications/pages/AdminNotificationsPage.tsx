import React, { useEffect, useState, useCallback } from 'react';
import { useAdminDispatch } from '../../../store/hooks';
import { fetchNotifications } from '../store/notifications.slice';
import { useAdminNotificationsState, useNotificationCrud } from '../hooks';
import PageHeader from '../../../components/PageHeader';
import { Button, Loader } from '@shared/components';
import ConfirmModal from '../../../components/ConfirmModal';
import DeleteAllButton from '../../../components/DeleteAllButton';
import { Bell, Plus } from '@shared/icons';
import type { INotification } from '../../../types';
import { NotificationRow, NotificationFilters, NotificationFormModal, Pagination } from '../components';
import { typeOptions, audienceOptions, formTypeOptions, formAudienceOptions, channelOptions } from '../constants';

const AdminNotificationsPage: React.FC = () => {
  const dispatch = useAdminDispatch();
  const { notifications, loading, totalPages, currentPage, totalNotifications } = useAdminNotificationsState();
  const {
    modalOpen, setModalOpen,
    form, setForm,
    sendingId,
    confirmSend, setConfirmSend,
    editing,
    confirmDelete, setConfirmDelete,
    openCreateModal,
    openEditModal,
    handleCreate,
    handleDelete,
    handleSend,
    handleConfirmSend,
  } = useNotificationCrud();

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [audienceFilter, setAudienceFilter] = useState('');
  const [page, setPage] = useState(1);

  const loadNotifications = useCallback(() => {
    dispatch(fetchNotifications({ page, limit: 12 }));
  }, [dispatch, page]);

  useEffect(() => { loadNotifications(); }, [loadNotifications]);
  useEffect(() => { setPage(1); }, [search, typeFilter, audienceFilter]);

  const filtered = notifications.filter((n: INotification) => {
    const matchSearch = !search || n.title.toLowerCase().includes(search.toLowerCase());
    const matchType = !typeFilter || n.type === typeFilter;
    const matchAudience = !audienceFilter || n.targetAudience === audienceFilter;
    return matchSearch && matchType && matchAudience;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Notifications" subtitle={`${totalNotifications} total notifications`} actions={<div className="flex gap-3"><DeleteAllButton resource="notifications" displayName="Notifications" /><Button onClick={openCreateModal}><Plus className="w-4 h-4" />Create Notification</Button></div>} />

      <NotificationFilters
        search={search}
        typeFilter={typeFilter}
        audienceFilter={audienceFilter}
        onSearchChange={setSearch}
        onTypeFilterChange={setTypeFilter}
        onAudienceFilterChange={setAudienceFilter}
        typeOptions={typeOptions}
        audienceOptions={audienceOptions}
      />

      {loading ? (
        <div className="flex justify-center py-12"><Loader size="lg" /></div>
      ) : filtered.length === 0 ? (
        <div className="admin-card-solid">
          <div className="flex flex-col items-center justify-center py-16">
            <Bell className="w-12 h-12 text-tb-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-tb-navy dark:text-white mb-1">No notifications found</h3>
            <p className="text-tb-gray-500 dark:text-gray-400 text-sm mb-4">Create your first notification to get started</p>
            <Button onClick={openCreateModal}><Plus className="w-4 h-4" />Create Notification</Button>
          </div>
        </div>
      ) : (
        <>
          <div className="admin-card-solid overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-tb-gray-100 bg-tb-gray-50/50">
                    <th className="text-left px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Title</th>
                    <th className="text-left px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Type</th>
                    <th className="text-left px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Audience</th>
                    <th className="text-left px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Channels</th>
                    <th className="text-left px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Status</th>
                    <th className="text-left px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Created By</th>
                    <th className="text-left px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Created At</th>
                    <th className="text-right px-4 py-3 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-tb-gray-100">
                  {filtered.map((n: INotification) => (
                    <NotificationRow
                      key={n._id}
                      notification={n}
                      onEdit={openEditModal}
                      onSend={handleSend}
                      onDelete={(id, title) => setConfirmDelete({ id, title })}
                      sendingId={sendingId}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

      <NotificationFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        form={form}
        onChange={setForm}
        onSubmit={handleCreate}
        editing={editing}
        formTypeOptions={formTypeOptions}
        formAudienceOptions={formAudienceOptions}
        channelOptions={channelOptions}
      />
      <ConfirmModal
        isOpen={confirmSend !== null}
        onCancel={() => setConfirmSend(null)}
        onConfirm={handleConfirmSend}
        title="Send Notification"
        message={`Are you sure you want to send "${confirmSend?.name}"?`}
      />
      <ConfirmModal
        isOpen={confirmDelete !== null}
        onCancel={() => setConfirmDelete(null)}
        onConfirm={() => confirmDelete && handleDelete(confirmDelete.id)}
        title="Delete Notification"
        message={`Are you sure you want to delete "${confirmDelete?.title}"?`}
      />
    </div>
  );
};

export default AdminNotificationsPage;
