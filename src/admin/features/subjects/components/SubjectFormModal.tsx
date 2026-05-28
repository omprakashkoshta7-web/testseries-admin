import React from 'react';
import { Button, Input, Select, Modal, Toggle } from '@shared/components';
import type { IAdminSubject, IAdminSubjectForm, IExamCategory } from '../../../types';

interface Props {
  isOpen: boolean;
  editing: IAdminSubject | null;
  form: IAdminSubjectForm;
  onFormChange: (form: IAdminSubjectForm) => void;
  categories: IExamCategory[];
  onSave: () => void;
  onClose: () => void;
}

const SubjectFormModal: React.FC<Props> = ({ isOpen, editing, form, onFormChange: setForm, categories, onSave, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editing ? 'Edit Subject' : 'Add Subject'}>
      <div className="space-y-4 p-4">
        <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Quantitative Aptitude" />
        <Select label="Exam Category" value={form.categoryId || ''} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} options={[{ value: '', label: 'Select Category' }, ...categories.map((c: IExamCategory) => ({ value: c._id, label: c.name }))]} />
        <Input label="Icon" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
        <Input label="Color (hex)" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} placeholder="#3273e6" />
        <Input label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <Input label="Order" type="number" value={String(form.order)} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />
        <label className="flex items-center gap-2 text-sm text-tb-gray-700 dark:text-gray-300"><Toggle checked={form.isActive} onChange={(v) => setForm({ ...form, isActive: v })} /> Active</label>
        <Button onClick={onSave} className="w-full mt-2">{editing ? 'Update' : 'Create'}</Button>
      </div>
    </Modal>
  );
};

export default SubjectFormModal;
