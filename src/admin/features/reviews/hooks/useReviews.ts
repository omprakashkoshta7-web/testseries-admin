import { useEffect, useState, useCallback } from 'react';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { fetchReviews, createReview, updateReviewStatus, deleteReview } from '../store/reviews.slice';
import { emptyForm } from '../constants';
import { useToast } from '../../../utils/ToastContext';
import type { IReviewItem } from '../../../types';

export const useReviews = () => {
  const dispatch = useAdminDispatch();
  const { items, loading } = useAdminSelector((s: any) => s.reviews);
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<IReviewItem | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [viewing, setViewing] = useState<IReviewItem | null>(null);

  useEffect(() => { dispatch(fetchReviews(undefined)); }, [dispatch]);

  const filtered = items.filter((r: IReviewItem) => {
    if (statusFilter && r.status !== statusFilter) return false;
    if (typeFilter && r.entityType !== typeFilter) return false;
    if (search && !r.entityId.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const openCreate = useCallback(() => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }, []);

  const handleSave = useCallback(async () => {
    const res = await dispatch(createReview(form));
    if (res.meta.requestStatus === 'fulfilled') {
      showToast('Review created', 'success');
      setModalOpen(false);
    } else {
      showToast(res.payload as string, 'error');
    }
  }, [dispatch, form, showToast]);

  const handleApproval = useCallback(async (id: string, status: string) => {
    const res = await dispatch(updateReviewStatus({ id, status }));
    if (res.meta.requestStatus === 'fulfilled') {
      showToast('Review status updated', 'success');
    } else {
      showToast(res.payload as string, 'error');
    }
  }, [dispatch, showToast]);

  const handleDelete = useCallback(async () => {
    if (!confirmDelete) return;
    const res = await dispatch(deleteReview(confirmDelete));
    if (res.meta.requestStatus === 'fulfilled') {
      showToast('Review deleted', 'success');
      setConfirmDelete(null);
    } else {
      showToast(res.payload as string, 'error');
    }
  }, [dispatch, confirmDelete, showToast]);

  const handleFormChange = useCallback((field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  return {
    items,
    filtered,
    loading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    modalOpen,
    setModalOpen,
    editing,
    form,
    setForm,
    confirmDelete,
    setConfirmDelete,
    viewing,
    setViewing,
    openCreate,
    handleSave,
    handleApproval,
    handleDelete,
    handleFormChange,
  };
};
