import { useState, useEffect, useCallback } from 'react';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { fetchHomeContents, createHomeContent, updateHomeContent, deleteHomeContent } from '../store/home.slice';
import { selectHomeContentItems, selectHomeContentLoading } from '../store/home.selectors';
import { useToast } from '../../../utils/ToastContext';
import type { IHomeContent, IHomeContentForm } from '../../../types';

const emptyForm: IHomeContentForm = {
  key: '',
  value: '',
  type: 'text',
  section: 'general',
  label: '',
  order: 0,
  isActive: true,
};

export const useHomeContents = () => {
  const dispatch = useAdminDispatch();
  const items = useAdminSelector(selectHomeContentItems);
  const loading = useAdminSelector(selectHomeContentLoading);
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<IHomeContent | null>(null);
  const [form, setForm] = useState<IHomeContentForm>(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; label: string } | null>(null);

  const loadItems = useCallback(() => {
    dispatch(fetchHomeContents());
  }, [dispatch]);

  useEffect(() => { loadItems(); }, [loadItems]);

  const openCreateModal = () => {
    setEditingItem(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (item: IHomeContent) => {
    setEditingItem(item);
    setForm({
      key: item.key,
      value: item.value,
      type: item.type,
      section: item.section,
      label: item.label,
      order: item.order,
      isActive: item.isActive,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingItem) {
        await dispatch(updateHomeContent({ id: editingItem._id, data: form })).unwrap();
      } else {
        await dispatch(createHomeContent(form)).unwrap();
      }
      showToast(editingItem ? 'Content updated successfully' : 'Content created successfully', 'success');
      setModalOpen(false);
    } catch {
      showToast('Failed to save content', 'error');
    }
  };

  const handleConfirmDelete = async () => {
    if (!confirmDelete) return;
    try {
      await dispatch(deleteHomeContent(confirmDelete.id)).unwrap();
      showToast('Content deleted successfully', 'success');
    } catch {
      showToast('Failed to delete content', 'error');
    }
    setConfirmDelete(null);
  };

  return {
    items,
    loading,
    search,
    setSearch,
    modalOpen,
    setModalOpen,
    editingItem,
    form,
    setForm,
    confirmDelete,
    setConfirmDelete,
    loadItems,
    openCreateModal,
    openEditModal,
    handleSave,
    handleConfirmDelete,
  };
};
