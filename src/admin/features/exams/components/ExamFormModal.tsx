import React from 'react';
import { Button, Input, Select, Modal, Toggle } from '@shared/components';
import type { IAdminExam, IAdminExamForm, IExamCategory } from '../../../types';

interface Props {
  isOpen: boolean;
  editing: IAdminExam | null;
  form: IAdminExamForm;
  onFormChange: (form: IAdminExamForm) => void;
  categories: IExamCategory[];
  onSave: () => void;
  onClose: () => void;
}

const ExamFormModal: React.FC<Props> = ({ isOpen, editing, form, onFormChange: setForm, categories, onSave, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editing ? 'Edit Exam' : 'Add Exam'}>
      <div className="space-y-4 p-4">
        <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: editing ? form.slug : e.target.value.toLowerCase().replace(/\s+/g, '-') })} />
        <Input label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        <Select label="Category" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} options={categories.map((c: IExamCategory) => ({ value: c._id, label: c.name }))} />
        <Input label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <Input label="Icon" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
        <Input label="Color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} />
        <Select label="Difficulty" value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })} options={[{ value: 'easy', label: 'Easy' }, { value: 'medium', label: 'Medium' }, { value: 'hard', label: 'Hard' }]} />
        <Select label="Group (Engineering)" value={form.group} onChange={(e) => setForm({ ...form, group: e.target.value as 'national' | 'state' | '' })} options={[{ value: '', label: 'None' }, { value: 'national', label: 'National Level' }, { value: 'state', label: 'State Level' }]} />
        <Input label="Order" type="number" value={String(form.order)} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />
        <label className="flex items-center gap-2 text-sm text-tb-gray-700 dark:text-gray-300"><Toggle checked={form.isActive} onChange={(v) => setForm({ ...form, isActive: v })} /> Active</label>
        <Button onClick={onSave} className="w-full mt-2">{editing ? 'Update' : 'Create'}</Button>
      </div>
    </Modal>
  );
};

export default ExamFormModal;
