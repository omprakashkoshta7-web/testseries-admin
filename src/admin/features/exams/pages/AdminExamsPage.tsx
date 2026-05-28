import React from 'react';
import { Button, Input, Select, Loader } from '@shared/components';
import { Plus, Search } from '@shared/icons';
import type { IExamCategory } from '../../../types';
import { useToast } from '../../../utils/ToastContext';
import ConfirmModal from '../../../components/ConfirmModal';
import DeleteAllButton from '../../../components/DeleteAllButton';
import PageHeader from '../../../components/PageHeader';
import { useExams } from '../hooks/useExams';
import ExamRow from '../components/ExamRow';
import ExamFormModal from '../components/ExamFormModal';

const AdminExamsPage: React.FC = () => {
  const { items, loading, categories, search, setSearch, catFilter, setCatFilter, filtered, modalOpen, setModalOpen, editing, form, setForm, confirmDelete, setConfirmDelete, openCreate, openEdit, handleSave, handleDelete } = useExams();
  const { showToast } = useToast();

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <PageHeader title="Exams" subtitle="Manage exams under categories" actions={<div className="flex gap-3"><DeleteAllButton resource="exams" displayName="Exams" /><Button onClick={openCreate}><Plus className="w-4 h-4" /> Add Exam</Button></div>} />
      <div className="admin-toolbar flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tb-gray-400" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search exams..." className="pl-10" />
        </div>
        <Select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} options={[{ value: '', label: 'All Categories' }, ...categories.map((c: IExamCategory) => ({ value: c._id, label: c.name }))]} className="w-48" />
      </div>
      <div className="grid gap-4">
        {filtered.map((exam: any) => {
          const catName = typeof exam.categoryId === 'object' ? exam.categoryId?.name : 'N/A';
          return <ExamRow key={exam._id} exam={exam} categoryName={catName} onEdit={openEdit} onDelete={(id) => setConfirmDelete(id)} />;
        })}
        {filtered.length === 0 && <p className="text-tb-gray-500 dark:text-gray-400 text-center py-8">No exams found</p>}
      </div>
      <ExamFormModal isOpen={modalOpen} editing={editing} form={form} onFormChange={setForm} categories={categories} onSave={handleSave} onClose={() => setModalOpen(false)} />
      <ConfirmModal isOpen={!!confirmDelete} onCancel={() => setConfirmDelete(null)} onConfirm={handleDelete} title="Delete Exam?" message="This will permanently delete this exam." />
    </div>
  );
};
export default AdminExamsPage;
