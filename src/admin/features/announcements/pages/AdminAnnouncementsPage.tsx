import React, { useEffect, useState, useCallback } from 'react';
import { useAdminDispatch } from '../../../store/hooks';
import { fetchAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } from '../store/announcements.slice';
import { useAdminAnnouncementsState } from '../hooks';
import { Button, Loader } from '@shared/components';
import { Plus, Megaphone } from '@shared/icons';
import type { IAnnouncement, IAnnouncementForm } from '../../../types';
import DeleteAllButton from '../../../components/DeleteAllButton';
import PageHeader from '../../../components/PageHeader';
import { useToast } from '../../../utils/ToastContext';
import ConfirmModal from '../../../components/ConfirmModal';
import { emptyForm } from '../constants';
import { AnnouncementRow, AnnouncementFormModal } from '../components';

const AdminAnnouncementsPage: React.FC = () => {
  const dispatch = useAdminDispatch();
  const { announcements, loading } = useAdminAnnouncementsState();
  const { showToast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<IAnnouncementForm>(emptyForm);
  const [actionError, setActionError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; title: string } | null>(null);

  const loadAnnouncements = useCallback(() => {
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  useEffect(() => { loadAnnouncements(); }, [loadAnnouncements]);

  const openCreateModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setActionError(null);
    setModalOpen(true);
  };

  const openEditModal = (a: IAnnouncement) => {
    setEditingId(a._id);
    setForm({
      title: a.title,
      content: a.content,
      type: a.type,
      priority: a.priority,
      targetAudience: a.targetAudience,
      targetIds: a.targetIds || [],
      isActive: a.isActive,
      pinned: a.pinned,
    });
    setActionError(null);
    setModalOpen(true);
  };

  const handleSave = async () => {
    setActionError(null);
    try {
      if (editingId) {
        await dispatch(updateAnnouncement({ id: editingId, data: form })).unwrap();
        showToast('Announcement updated successfully', 'success');
      } else {
        await dispatch(createAnnouncement(form)).unwrap();
        showToast('Announcement created successfully', 'success');
      }
      setModalOpen(false);
      loadAnnouncements();
    } catch (e: any) {
      setActionError(typeof e === 'string' ? e : e?.message || 'Failed to save announcement');
    }
  };

  const handleDelete = (id: string, title: string) => {
    setConfirmDelete({ id, title });
  };

  const performDelete = async () => {
    if (!confirmDelete) return;
    try {
      await dispatch(deleteAnnouncement(confirmDelete.id)).unwrap();
      showToast(`Announcement "${confirmDelete.title}" deleted`, 'success');
      setConfirmDelete(null);
      loadAnnouncements();
    } catch (e: any) {
      showToast(typeof e === 'string' ? e : 'Failed to delete announcement', 'error');
      setConfirmDelete(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Announcements" subtitle={`${announcements.length} total announcements`} actions={<div className="flex gap-3"><DeleteAllButton resource="announcements" displayName="Announcements" /><Button onClick={openCreateModal}><Plus className="w-4 h-4" />Create Announcement</Button></div>} />

      {loading ? (
        <div className="flex justify-center py-12"><Loader size="lg" /></div>
      ) : announcements.length === 0 ? (
        <div className="admin-card-solid">
          <div className="flex flex-col items-center justify-center py-16">
            <Megaphone className="w-12 h-12 text-tb-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-tb-navy dark:text-white mb-1">No announcements found</h3>
            <p className="text-tb-gray-500 dark:text-gray-400 text-sm mb-4">Create your first announcement to get started</p>
            <Button onClick={openCreateModal}><Plus className="w-4 h-4" />Create Announcement</Button>
          </div>
        </div>
      ) : (
        <div className="admin-card-solid overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-tb-gray-100 bg-tb-gray-50/50">
                  <th className="text-left px-5 py-3.5 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Title</th>
                  <th className="text-left px-5 py-3.5 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Type</th>
                  <th className="text-left px-5 py-3.5 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Priority</th>
                  <th className="text-left px-5 py-3.5 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Pinned</th>
                  <th className="text-left px-5 py-3.5 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Audience</th>
                  <th className="text-left px-5 py-3.5 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Created By</th>
                  <th className="text-left px-5 py-3.5 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Created At</th>
                  <th className="text-right px-5 py-3.5 font-semibold text-tb-navy dark:text-white text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((a: IAnnouncement) => (
                  <AnnouncementRow key={a._id} announcement={a} onEdit={openEditModal} onDelete={handleDelete} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AnnouncementFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        form={form}
        onChange={setForm}
        onSubmit={handleSave}
        editingId={editingId}
        actionError={actionError}
      />

      <ConfirmModal
        isOpen={!!confirmDelete}
        onCancel={() => setConfirmDelete(null)}
        onConfirm={performDelete}
        title="Delete Announcement"
        message={confirmDelete ? `Delete announcement "${confirmDelete.title}"?` : ''}
      />
    </div>
  );
};

export default AdminAnnouncementsPage;
