import React from 'react';
import { Button, Input, Loader } from '@shared/components';
import { Plus, Search } from '@shared/icons';
import { useToast } from '../../../utils/ToastContext';
import ConfirmModal from '../../../components/ConfirmModal';
import DeleteAllButton from '../../../components/DeleteAllButton';
import PageHeader from '../../../components/PageHeader';
import { useExamCategories } from '../hooks/useExamCategories';
import ExamCategoryRow from '../components/ExamCategoryRow';
import ExamCategoryFormModal from '../components/ExamCategoryFormModal';

const AdminExamCategoriesPage: React.FC = () => {
  const { items, loading, search, setSearch, filtered, modalOpen, setModalOpen, editing, form, setForm, confirmDelete, setConfirmDelete, openCreate, openEdit, handleSave, handleDelete } = useExamCategories();
  const { showToast } = useToast();

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <PageHeader title="Exam Categories" subtitle="Manage exam categories" actions={<div className="flex gap-3"><DeleteAllButton resource="exam-categories" displayName="Exam Categories" /><Button onClick={openCreate}><Plus className="w-4 h-4" /> Add Category</Button></div>} />
      <div className="admin-toolbar">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tb-gray-400" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search categories..." className="pl-10" />
        </div>
      </div>
      <div className="grid gap-4">
        {filtered.map((cat: any) => (
          <ExamCategoryRow key={cat._id} category={cat} onEdit={openEdit} onDelete={(id) => setConfirmDelete(id)} />
        ))}
        {filtered.length === 0 && <p className="text-tb-gray-500 dark:text-gray-400 text-center py-8">No categories found</p>}
      </div>
      <ExamCategoryFormModal isOpen={modalOpen} editing={editing} form={form} onFormChange={setForm} onSave={handleSave} onClose={() => setModalOpen(false)} />
      <ConfirmModal isOpen={!!confirmDelete} onCancel={() => setConfirmDelete(null)} onConfirm={handleDelete} title="Delete Category?" message="This will permanently delete this category." />
    </div>
  );
};
export default AdminExamCategoriesPage;
