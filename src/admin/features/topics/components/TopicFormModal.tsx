import React from 'react';
import { Button, Input, Select, Modal, Toggle } from '@shared/components';
import type { ITopic, ITopicForm, IAdminSubject, IExamCategory } from '../../../types';

interface Props {
  isOpen: boolean;
  editing: ITopic | null;
  form: ITopicForm;
  onFormChange: (form: ITopicForm) => void;
  catFilter: string;
  onCatFilterChange: (val: string) => void;
  filteredSubjects: IAdminSubject[];
  categories: IExamCategory[];
  onSave: () => void;
  onClose: () => void;
}

const TopicFormModal: React.FC<Props> = ({ isOpen, editing, form, onFormChange: setForm, catFilter, onCatFilterChange: setCatFilter, filteredSubjects, categories, onSave, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editing ? 'Edit Topic' : 'Add Topic'}>
      <div className="space-y-4 p-4">
        <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: editing ? form.slug : e.target.value.toLowerCase().replace(/\s+/g, '-') })} placeholder="e.g. Algebra" />
        <Input label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        <Select label="Exam Category" value={catFilter} onChange={(e) => { setCatFilter(e.target.value); setForm({ ...form, subjectId: '' }); }} options={[{ value: '', label: 'Select Category' }, ...categories.map((c: IExamCategory) => ({ value: c._id, label: c.name }))]} />
        <Select label="Subject" value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })} options={[{ value: '', label: 'Select Subject' }, ...filteredSubjects.map((s: IAdminSubject) => ({ value: s._id, label: s.name }))]} />
        <Input label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <Input label="Order" type="number" value={String(form.order)} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />
        <label className="flex items-center gap-2 text-sm text-tb-gray-700 dark:text-gray-300"><Toggle checked={form.isActive} onChange={(v) => setForm({ ...form, isActive: v })} /> Active</label>
        <Button onClick={onSave} className="w-full mt-2">{editing ? 'Update' : 'Create'}</Button>
      </div>
    </Modal>
  );
};

export default TopicFormModal;
