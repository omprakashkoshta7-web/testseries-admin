import { useEffect, useState } from 'react';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { fetchAdminSubjects, createAdminSubject, updateAdminSubject, deleteAdminSubject } from '../store/subjects.slice';
import { fetchExamCategories } from '../../exam-categories/store/examCategories.slice';
import type { IAdminSubject, IExamCategory } from '../../../types';
import { useToast } from '../../../utils/ToastContext';
import { emptyForm } from '../constants';

export const useSubjects = () => {
  const dispatch = useAdminDispatch();
  const { items, loading } = useAdminSelector((s: any) => s.adminSubjects);
  const categories = useAdminSelector((s: any) => s.examCategories.items);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<IAdminSubject | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => { dispatch(fetchAdminSubjects()); dispatch(fetchExamCategories()); }, [dispatch]);

  const filtered = items.filter((s: IAdminSubject) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = !catFilter || (typeof s.categoryId === 'object' && s.categoryId?._id === catFilter);
    return matchSearch && matchCat;
  });

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };

  const openEdit = (sub: IAdminSubject) => {
    const catId = typeof sub.categoryId === 'object' ? sub.categoryId?._id || '' : sub.categoryId || '';
    setEditing(sub); setForm({ name: sub.name, icon: sub.icon, color: sub.color, categoryId: catId, description: sub.description, order: sub.order, isActive: sub.isActive }); setModalOpen(true);
  };

  const handleSave = async () => {
    const res = editing ? await dispatch(updateAdminSubject({ id: editing._id, form })) : await dispatch(createAdminSubject(form));
    if (res.meta.requestStatus === 'fulfilled') { showToast(editing ? 'Subject updated' : 'Subject created', 'success'); setModalOpen(false); }
    else showToast(res.payload as string, 'error');
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    const res = await dispatch(deleteAdminSubject(confirmDelete));
    if (res.meta.requestStatus === 'fulfilled') { showToast('Subject deleted', 'success'); setConfirmDelete(null); }
    else showToast(res.payload as string, 'error');
  };

  const handleConfirmDelete = (id: string) => setConfirmDelete(id);

  return { items, loading, categories, search, setSearch, catFilter, setCatFilter, filtered, modalOpen, setModalOpen, editing, form, setForm, confirmDelete, setConfirmDelete, openCreate, openEdit, handleSave, handleDelete, handleConfirmDelete };
};
