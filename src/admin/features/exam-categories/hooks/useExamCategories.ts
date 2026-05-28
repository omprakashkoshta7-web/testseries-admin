import { useEffect, useState } from 'react';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { fetchExamCategories, createExamCategory, updateExamCategory, deleteExamCategory } from '../store/examCategories.slice';
import type { IExamCategory } from '../../../types';
import { useToast } from '../../../utils/ToastContext';
import { emptyForm } from '../constants';

export const useExamCategories = () => {
  const dispatch = useAdminDispatch();
  const { items, loading } = useAdminSelector((s: any) => s.examCategories);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<IExamCategory | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => { dispatch(fetchExamCategories()); }, [dispatch]);

  const filtered = items.filter((c: IExamCategory) => c.name.toLowerCase().includes(search.toLowerCase()));

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };

  const openEdit = (cat: IExamCategory) => { setEditing(cat); setForm({ name: cat.name, slug: cat.slug, description: cat.description, icon: cat.icon, color: cat.color, image: cat.image || '', order: cat.order }); setModalOpen(true); };

  const handleSave = async () => {
    const res = editing
      ? await dispatch(updateExamCategory({ id: editing._id, form }))
      : await dispatch(createExamCategory(form));
    if (res.meta.requestStatus === 'fulfilled') { showToast(editing ? 'Category updated' : 'Category created', 'success'); setModalOpen(false); }
    else showToast(res.payload as string, 'error');
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    const res = await dispatch(deleteExamCategory(confirmDelete));
    if (res.meta.requestStatus === 'fulfilled') { showToast('Category deleted', 'success'); setConfirmDelete(null); }
    else showToast(res.payload as string, 'error');
  };

  const handleConfirmDelete = (id: string) => setConfirmDelete(id);

  return { items, loading, search, setSearch, filtered, modalOpen, setModalOpen, editing, form, setForm, confirmDelete, setConfirmDelete, openCreate, openEdit, handleSave, handleDelete, handleConfirmDelete };
};
