import { useState, useEffect, useCallback } from 'react';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { fetchFaqs, createFaq, updateFaq, deleteFaq } from '../store/faq.slice';
import { selectAdminFaqs, selectAdminFaqsLoading } from '../store/faq.selectors';
import { useToast } from '../../../utils/ToastContext';
import type { IFaq, IFaqForm } from '../../../types';

const emptyForm: IFaqForm = {
  question: '',
  answer: '',
  category: 'General',
  order: 0,
  isActive: true,
};

export const useFaqs = () => {
  const dispatch = useAdminDispatch();
  const faqs = useAdminSelector(selectAdminFaqs);
  const loading = useAdminSelector(selectAdminFaqsLoading);
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<IFaq | null>(null);
  const [form, setForm] = useState<IFaqForm>(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; title: string } | null>(null);

  const loadFaqs = useCallback(() => {
    dispatch(fetchFaqs());
  }, [dispatch]);

  useEffect(() => { loadFaqs(); }, [loadFaqs]);

  const openCreateModal = () => {
    setEditingFaq(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (faq: IFaq) => {
    setEditingFaq(faq);
    setForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      order: faq.order,
      isActive: faq.isActive,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingFaq) {
        await dispatch(updateFaq({ id: editingFaq._id, data: form })).unwrap();
      } else {
        await dispatch(createFaq(form)).unwrap();
      }
      showToast(editingFaq ? 'FAQ updated successfully' : 'FAQ created successfully', 'success');
      setModalOpen(false);
    } catch {
      showToast('Failed to save FAQ', 'error');
    }
  };

  const handleDelete = (faq: IFaq) => {
    setConfirmDelete({ id: faq._id, title: faq.question });
  };

  const handleConfirmDelete = async () => {
    if (!confirmDelete) return;
    try {
      await dispatch(deleteFaq(confirmDelete.id)).unwrap();
      showToast('FAQ deleted successfully', 'success');
    } catch {
      showToast('Failed to delete FAQ', 'error');
    }
    setConfirmDelete(null);
  };

  return {
    faqs,
    loading,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    modalOpen,
    setModalOpen,
    editingFaq,
    form,
    setForm,
    confirmDelete,
    setConfirmDelete,
    loadFaqs,
    openCreateModal,
    openEditModal,
    handleSave,
    handleDelete,
    handleConfirmDelete,
  };
};
