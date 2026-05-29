import React from 'react';
import { Button, Input, Select, Modal } from '@shared/components';
import type { IExamCategory, IExamCategoryForm } from '../../../types';
import { iconOptions } from '../constants';

interface Props {
  isOpen: boolean;
  editing: IExamCategory | null;
  form: IExamCategoryForm;
  onFormChange: (form: IExamCategoryForm) => void;
  onSave: () => void;
  onClose: () => void;
}

const ExamCategoryFormModal: React.FC<Props> = ({ isOpen, editing, form, onFormChange: setForm, onSave, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editing ? 'Edit Category' : 'Add Category'}>
      <div className="space-y-4 p-4">
        <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: editing ? form.slug : e.target.value.toLowerCase().replace(/\s+/g, '-') })} placeholder="e.g. Government" />
        <Input label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="e.g. government" />
        <Input label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief description" />
        <Select label="Icon" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} options={iconOptions} />
        <Input label="Color (Tailwind gradient)" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} placeholder="from-blue-500 to-blue-600" />
        <Input label="Image URL" value={form.image || ''} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
        {form.image && <img src={form.image} alt="Preview" className="w-20 h-20 rounded-xl object-cover border" />}
        <Input label="Order" type="number" value={String(form.order)} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />
        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-tb-blue" />
          </label>
          <span className="text-sm font-medium text-tb-navy dark:text-white">Active</span>
        </div>
        <Button onClick={onSave} className="w-full mt-2">{editing ? 'Update' : 'Create'}</Button>
      </div>
    </Modal>
  );
};

export default ExamCategoryFormModal;
