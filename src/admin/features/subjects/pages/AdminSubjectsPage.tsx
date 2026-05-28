import React from 'react';
import { Button, Input, Select, Loader } from '@shared/components';
import { Plus, Search } from '@shared/icons';
import type { IExamCategory } from '../../../types';
import { useToast } from '../../../utils/ToastContext';
import ConfirmModal from '../../../components/ConfirmModal';
import DeleteAllButton from '../../../components/DeleteAllButton';
import PageHeader from '../../../components/PageHeader';
import { useSubjects } from '../hooks/useSubjects';
import SubjectRow from '../components/SubjectRow';
import SubjectFormModal from '../components/SubjectFormModal';

const AdminSubjectsPage: React.FC = () => {
  const { items, loading, categories, search, setSearch, catFilter, setCatFilter, filtered, modalOpen, setModalOpen, editing, form, setForm, confirmDelete, setConfirmDelete, openCreate, openEdit, handleSave, handleDelete } = useSubjects();
  const { showToast } = useToast();

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <PageHeader title="Subjects" subtitle="Manage subjects (e.g. Quant, English, Reasoning)" actions={<div className="flex gap-3"><DeleteAllButton resource="subjects" displayName="Subjects" /><Button onClick={openCreate}><Plus className="w-4 h-4" /> Add Subject</Button></div>} />
      <div className="admin-toolbar flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tb-gray-400" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search subjects..." className="pl-10" />
        </div>
        <Select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} options={[{ value: '', label: 'All Categories' }, ...categories.map((c: IExamCategory) => ({ value: c._id, label: c.name }))]} className="w-48" />
      </div>
      <div className="grid gap-4">
        {filtered.map((sub: any) => {
          const catName = typeof sub.categoryId === 'object' ? sub.categoryId?.name : '';
          return <SubjectRow key={sub._id} subject={sub} categoryName={catName} onEdit={openEdit} onDelete={(id) => setConfirmDelete(id)} />;
        })}
        {filtered.length === 0 && <p className="text-tb-gray-500 dark:text-gray-400 text-center py-8">No subjects found</p>}
      </div>
      <SubjectFormModal isOpen={modalOpen} editing={editing} form={form} onFormChange={setForm} categories={categories} onSave={handleSave} onClose={() => setModalOpen(false)} />
      <ConfirmModal isOpen={!!confirmDelete} onCancel={() => setConfirmDelete(null)} onConfirm={handleDelete} title="Delete Subject?" message="Cannot delete if topics exist under this subject." />
    </div>
  );
};
export default AdminSubjectsPage;
