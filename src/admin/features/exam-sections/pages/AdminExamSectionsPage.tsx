import React, { useEffect, useState } from 'react';
import { Button, Input, Select, Modal, Loader } from '@shared/components';
import { Plus, Edit, Trash2, Search } from '@shared/icons';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { fetchExamSections, createExamSection, updateExamSection, deleteExamSection } from '../store/examSections.slice';
import { fetchExamCategories } from '../../exam-categories/store/examCategories.slice';
import { useToast } from '../../../utils/ToastContext';
import ConfirmModal from '../../../components/ConfirmModal';
import PageHeader from '../../../components/PageHeader';
import type { IExamSection, IExamCategory } from '../../../types';

const emptyForm = { categoryId: '', title: '', subtitle: '', icon: 'BookOpen', order: 0 };

const AdminExamSectionsPage: React.FC = () => {
  const dispatch = useAdminDispatch();
  const { items, loading } = useAdminSelector((s: any) => s.examSections);
  const categories = useAdminSelector((s: any) => s.examCategories.items);
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<IExamSection | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => { dispatch(fetchExamSections(undefined)); dispatch(fetchExamCategories()); }, [dispatch]);

  const filtered = items.filter((s: IExamSection) => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase());
    const catId = typeof s.categoryId === 'object' ? s.categoryId?._id : s.categoryId;
    const matchCat = !catFilter || catId === catFilter;
    return matchSearch && matchCat;
  });

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };

  const openEdit = (section: IExamSection) => {
    const catId = typeof section.categoryId === 'object' ? section.categoryId._id : section.categoryId;
    setEditing(section);
    setForm({ categoryId: catId, title: section.title, subtitle: section.subtitle, icon: section.icon, order: section.order });
    setModalOpen(true);
  };

  const handleSave = async () => {
    const res = editing
      ? await dispatch(updateExamSection({ id: editing._id, form }))
      : await dispatch(createExamSection(form));
    if (res.meta.requestStatus === 'fulfilled') {
      showToast(editing ? 'Section updated' : 'Section created', 'success');
      setModalOpen(false);
    } else {
      showToast(res.payload as string, 'error');
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    const res = await dispatch(deleteExamSection(confirmDelete));
    if (res.meta.requestStatus === 'fulfilled') {
      showToast('Section deleted', 'success');
      setConfirmDelete(null);
    } else {
      showToast(res.payload as string, 'error');
    }
  };

  if (loading && items.length === 0) return <Loader />;

  return (
    <div className="space-y-6">
      <PageHeader title="Exam Sections" subtitle="Create section headings to group exams on category pages" actions={<Button onClick={openCreate}><Plus className="w-4 h-4" /> Add Section</Button>} />
      <div className="admin-toolbar flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tb-gray-400" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search sections..." className="pl-10" />
        </div>
        <Select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} options={[{ value: '', label: 'All Categories' }, ...categories.map((c: IExamCategory) => ({ value: c._id, label: c.name }))]} className="w-48" />
      </div>
      <div className="grid gap-4">
        {filtered.map((section: IExamSection) => {
          const catName = typeof section.categoryId === 'object' ? section.categoryId?.name : 'N/A';
          return (
            <div key={section._id} className="admin-card p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-tb-navy">{section.title}</h3>
                <p className="text-sm text-tb-gray-500">{section.subtitle || 'No subtitle'}</p>
                <span className="text-xs text-tb-gray-400">{catName} &middot; Icon: {section.icon} &middot; Order: {section.order}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => openEdit(section)}><Edit className="w-4 h-4" /></Button>
                <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(section._id)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <p className="text-tb-gray-500 dark:text-gray-400 text-center py-8">No sections found. Create one to group exams on category pages.</p>}
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Section' : 'Add Section'}>
        <div className="space-y-4 p-4">
          <Select label="Category" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} options={categories.map((c: IExamCategory) => ({ value: c._id, label: c.name }))} />
          <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. National Level Exams" />
          <Input label="Subtitle" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} placeholder="e.g. Exams conducted at the national level" />
          <Input label="Icon" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
          <Input label="Order" type="number" value={String(form.order)} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />
          <Button onClick={handleSave} className="w-full mt-2">{editing ? 'Update' : 'Create'}</Button>
        </div>
      </Modal>
      <ConfirmModal isOpen={!!confirmDelete} onCancel={() => setConfirmDelete(null)} onConfirm={handleDelete} title="Delete Section?" message="This will permanently delete this section. Exams assigned to it will become ungrouped." />
    </div>
  );
};

export default AdminExamSectionsPage;
