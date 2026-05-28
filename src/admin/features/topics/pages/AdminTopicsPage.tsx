import React from 'react';
import { Button, Input, Select, Loader } from '@shared/components';
import { Plus, Search } from '@shared/icons';
import type { IExamCategory } from '../../../types';
import { useToast } from '../../../utils/ToastContext';
import ConfirmModal from '../../../components/ConfirmModal';
import DeleteAllButton from '../../../components/DeleteAllButton';
import PageHeader from '../../../components/PageHeader';
import { useTopics } from '../hooks/useTopics';
import TopicRow from '../components/TopicRow';
import TopicFormModal from '../components/TopicFormModal';

const AdminTopicsPage: React.FC = () => {
  const { items, loading, subjects, categories, search, setSearch, subFilter, setSubFilter, catFilter, setCatFilter, filteredSubjects, filtered, modalOpen, setModalOpen, editing, form, setForm, confirmDelete, setConfirmDelete, openCreate, openEdit, handleSave, handleDelete } = useTopics();
  const { showToast } = useToast();

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <PageHeader title="Topics" subtitle="Manage topics under subjects" actions={<div className="flex gap-3"><DeleteAllButton resource="topics" displayName="Topics" /><Button onClick={openCreate}><Plus className="w-4 h-4" /> Add Topic</Button></div>} />
      <div className="admin-toolbar flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tb-gray-400" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search topics..." className="pl-10" />
        </div>
        <Select value={catFilter} onChange={(e) => { setCatFilter(e.target.value); setSubFilter(''); }} options={[{ value: '', label: 'All Categories' }, ...categories.map((c: IExamCategory) => ({ value: c._id, label: c.name }))]} className="w-48" />
        <Select value={subFilter} onChange={(e) => setSubFilter(e.target.value)} options={[{ value: '', label: 'All Subjects' }, ...filteredSubjects.map((s: any) => ({ value: s._id, label: s.name }))]} className="w-48" />
      </div>
      <div className="grid gap-4">
        {filtered.map((topic: any) => {
          const subName = typeof topic.subjectId === 'object' ? topic.subjectId?.name : 'N/A';
          return <TopicRow key={topic._id} topic={topic} subjectName={subName} onEdit={openEdit} onDelete={(id) => setConfirmDelete(id)} />;
        })}
        {filtered.length === 0 && <p className="text-tb-gray-500 dark:text-gray-400 text-center py-8">No topics found</p>}
      </div>
      <TopicFormModal isOpen={modalOpen} editing={editing} form={form} onFormChange={setForm} catFilter={catFilter} onCatFilterChange={setCatFilter} filteredSubjects={filteredSubjects} categories={categories} onSave={handleSave} onClose={() => setModalOpen(false)} />
      <ConfirmModal isOpen={!!confirmDelete} onCancel={() => setConfirmDelete(null)} onConfirm={handleDelete} title="Delete Topic?" message="This will permanently delete this topic." />
    </div>
  );
};
export default AdminTopicsPage;
