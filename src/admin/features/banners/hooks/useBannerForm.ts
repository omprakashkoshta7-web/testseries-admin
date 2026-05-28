import { useState, useCallback } from 'react';
import { useAdminDispatch } from '../../../store/hooks';
import { createBanner, updateBanner } from '../store/banners.slice';
import { useToast } from '../../../utils/ToastContext';
import { emptyForm } from '../constants';
import type { IBanner, IBannerForm } from '../../../types';

export const useBannerForm = () => {
  const dispatch = useAdminDispatch();
  const { showToast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<IBanner | null>(null);
  const [form, setForm] = useState<IBannerForm>(emptyForm);

  const openCreateModal = useCallback(() => {
    setEditingBanner(null);
    setForm(emptyForm);
    setModalOpen(true);
  }, []);

  const openEditModal = useCallback((banner: IBanner) => {
    setEditingBanner(banner);
    setForm({
      title: banner.title,
      subtitle: banner.subtitle || '',
      image: banner.image,
      link: banner.link || '',
      position: banner.position,
      priority: banner.priority,
      isActive: banner.isActive,
      startsAt: banner.startsAt || '',
      expiresAt: banner.expiresAt || '',
    });
    setModalOpen(true);
  }, []);

  const handleSave = useCallback(async () => {
    try {
      if (editingBanner) {
        await dispatch(updateBanner({ id: editingBanner._id, data: form })).unwrap();
      } else {
        await dispatch(createBanner(form)).unwrap();
      }
      showToast(editingBanner ? 'Banner updated successfully' : 'Banner created successfully', 'success');
      setModalOpen(false);
    } catch {
      showToast('Failed to save banner', 'error');
    }
  }, [dispatch, editingBanner, form, showToast]);

  return {
    modalOpen, setModalOpen,
    editingBanner,
    form, setForm,
    openCreateModal,
    openEditModal,
    handleSave,
  };
};
