import { useEffect, useState } from 'react';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { fetchTopics, createTopic, updateTopic, deleteTopic } from '../store/topics.slice';
import { fetchAdminSubjects } from '../../subjects/store/subjects.slice';
import { fetchExamCategories } from '../../exam-categories/store/examCategories.slice';
import type { ITopic, IAdminSubject, IExamCategory } from '../../../types';
import { useToast } from '../../../utils/ToastContext';
import { emptyForm } from '../constants';

export const useTopics = () => {
  const dispatch = useAdminDispatch();
  const { items, loading } = useAdminSelector((s: any) => s.topics);
  const subjects = useAdminSelector((s: any) => s.adminSubjects.items);
  const categories = useAdminSelector((s: any) => s.examCategories.items);
  const [search, setSearch] = useState('');
  const [subFilter, setSubFilter] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ITopic | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => { dispatch(fetchTopics(undefined)); dispatch(fetchAdminSubjects()); dispatch(fetchExamCategories()); }, [dispatch]);

  const filteredSubjects = subjects.filter((s: IAdminSubject) =>
    !catFilter || (typeof s.categoryId === 'object' && s.categoryId?._id === catFilter)
  );

  const filtered = items.filter((t: ITopic) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    const matchSub = !subFilter || (typeof t.subjectId === 'object' && t.subjectId?._id === subFilter);
    return matchSearch && matchSub;
  });

  const openCreate = () => { setEditing(null); setForm({ ...emptyForm }); setCatFilter(''); setModalOpen(true); };

  const openEdit = (topic: ITopic) => {
    const subId = typeof topic.subjectId === 'object' ? topic.subjectId._id : topic.subjectId;
    const sub = subjects.find((s: IAdminSubject) => s._id === subId);
    const subCatId = sub ? (typeof sub.categoryId === 'object' ? sub.categoryId?._id || '' : sub.categoryId || '') : '';
    setEditing(topic); setForm({ name: topic.name, slug: topic.slug, subjectId: subId, description: topic.description, order: topic.order, isActive: topic.isActive });
    setCatFilter(subCatId);
    setModalOpen(true);
  };

  const handleSave = async () => {
    const res = editing ? await dispatch(updateTopic({ id: editing._id, form })) : await dispatch(createTopic(form));
    if (res.meta.requestStatus === 'fulfilled') { showToast(editing ? 'Topic updated' : 'Topic created', 'success'); setModalOpen(false); }
    else showToast(res.payload as string, 'error');
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    const res = await dispatch(deleteTopic(confirmDelete));
    if (res.meta.requestStatus === 'fulfilled') { showToast('Topic deleted', 'success'); setConfirmDelete(null); }
    else showToast(res.payload as string, 'error');
  };

  const handleConfirmDelete = (id: string) => setConfirmDelete(id);

  return { items, loading, subjects, categories, search, setSearch, subFilter, setSubFilter, catFilter, setCatFilter, filteredSubjects, filtered, modalOpen, setModalOpen, editing, form, setForm, confirmDelete, setConfirmDelete, openCreate, openEdit, handleSave, handleDelete, handleConfirmDelete };
};
