import { useState, useCallback } from 'react';
import { useAdminDispatch } from '../../../store/hooks';
import { createNotification, sendNotification, updateNotification, deleteNotification } from '../store/notifications.slice';
import { useToast } from '../../../utils/ToastContext';
import { emptyForm } from '../constants';
import type { INotification, INotificationForm } from '../../../types';

export const useNotificationCrud = () => {
  const dispatch = useAdminDispatch();
  const { showToast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<INotificationForm>(emptyForm);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [confirmSend, setConfirmSend] = useState<{ id: string; name: string } | null>(null);
  const [editing, setEditing] = useState<INotification | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; title: string } | null>(null);

  const openCreateModal = useCallback(() => {
    setForm(emptyForm);
    setEditing(null);
    setModalOpen(true);
  }, []);

  const openEditModal = useCallback((n: INotification) => {
    setEditing(n);
    setForm({
      title: n.title,
      body: n.body,
      type: n.type,
      targetAudience: n.targetAudience,
      targetIds: n.targetIds || [],
      channels: n.channels,
      status: n.status === 'draft' ? 'draft' : 'draft',
      scheduledAt: n.scheduledAt,
    });
    setModalOpen(true);
  }, []);

  const handleCreate = useCallback(async () => {
    try {
      if (editing) {
        await dispatch(updateNotification({ id: editing._id, data: form })).unwrap();
        showToast('Notification updated');
      } else {
        await dispatch(createNotification(form)).unwrap();
        showToast('Notification created');
      }
      setModalOpen(false);
    } catch (e: any) {
      showToast(e || 'Error', 'error');
    }
  }, [dispatch, editing, form, showToast]);

  const handleDelete = useCallback(async (id: string) => {
    try {
      await dispatch(deleteNotification(id)).unwrap();
      showToast('Notification deleted');
    } catch (e: any) {
      showToast(e || 'Error', 'error');
    }
    setConfirmDelete(null);
  }, [dispatch, showToast]);

  const handleSend = useCallback((id: string, title: string) => {
    setConfirmSend({ id, name: title });
  }, []);

  const handleConfirmSend = useCallback(async () => {
    if (!confirmSend) return;
    try {
      setSendingId(confirmSend.id);
      await dispatch(sendNotification(confirmSend.id)).unwrap();
      showToast('Notification sent');
    } catch (e: any) {
      showToast(e || 'Error', 'error');
    }
    setSendingId(null);
    setConfirmSend(null);
  }, [confirmSend, dispatch, showToast]);

  return {
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
  };
};
