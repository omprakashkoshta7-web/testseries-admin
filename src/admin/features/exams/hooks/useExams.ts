import { useEffect, useState } from 'react';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { fetchAdminExams, createAdminExam, updateAdminExam, deleteAdminExam } from '../store/exams.slice';
import { fetchExamCategories } from '../../exam-categories/store/examCategories.slice';
import type { IAdminExam, IExamCategory } from '../../../types';
import { useToast } from '../../../utils/ToastContext';
import { emptyForm } from '../constants';

export const useExams = () => {
  const dispatch = useAdminDispatch();
  const { items, loading } = useAdminSelector((s: any) => s.adminExams);
  const categories = useAdminSelector((s: any) => s.examCategories.items);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<IAdminExam | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => { dispatch(fetchAdminExams(undefined)); dispatch(fetchExamCategories()); }, [dispatch]);

  const filtered = items.filter((e: IAdminExam) => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = !catFilter || (typeof e.categoryId === 'object' && e.categoryId?._id === catFilter);
    return matchSearch && matchCat;
  });

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };

  const openEdit = (exam: IAdminExam) => {
    const catId = typeof exam.categoryId === 'object' ? exam.categoryId._id : exam.categoryId;
    setEditing(exam); setForm({ name: exam.name, slug: exam.slug, categoryId: catId, description: exam.description, icon: exam.icon, color: exam.color, bannerUrl: exam.bannerUrl || '', difficulty: exam.difficulty, isActive: exam.isActive, order: exam.order, group: exam.group || '' }); setModalOpen(true);
  };

  const handleSave = async () => {
    const res = editing ? await dispatch(updateAdminExam({ id: editing._id, form })) : await dispatch(createAdminExam(form));
    if (res.meta.requestStatus === 'fulfilled') { showToast(editing ? 'Exam updated' : 'Exam created', 'success'); setModalOpen(false); }
    else showToast(res.payload as string, 'error');
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    const res = await dispatch(deleteAdminExam(confirmDelete));
    if (res.meta.requestStatus === 'fulfilled') { showToast('Exam deleted', 'success'); setConfirmDelete(null); }
    else showToast(res.payload as string, 'error');
  };

  const handleConfirmDelete = (id: string) => setConfirmDelete(id);

  return { items, loading, categories, search, setSearch, catFilter, setCatFilter, filtered, modalOpen, setModalOpen, editing, form, setForm, confirmDelete, setConfirmDelete, openCreate, openEdit, handleSave, handleDelete, handleConfirmDelete };
};
