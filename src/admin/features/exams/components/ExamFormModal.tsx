import React from 'react';
import { Button, Input, Select, Modal, Toggle } from '@shared/components';
import { Plus, X } from '@shared/icons';
import type { IAdminExam, IAdminExamForm, IExamCategory, IExamSection } from '../../../types';

interface Props {
  isOpen: boolean;
  editing: IAdminExam | null;
  form: IAdminExamForm;
  onFormChange: (form: IAdminExamForm) => void;
  categories: IExamCategory[];
  sections: IExamSection[];
  onSave: () => void;
  onClose: () => void;
}

const ExamFormModal: React.FC<Props> = ({ isOpen, editing, form, onFormChange: setForm, categories, sections, onSave, onClose }) => {
  const addSubCategory = () => setForm({ ...form, subCategories: [...form.subCategories, ''] });
  const removeSubCategory = (i: number) => setForm({ ...form, subCategories: form.subCategories.filter((_, idx) => idx !== i) });
  const updateSubCategory = (i: number, val: string) => {
    const sc = [...form.subCategories];
    sc[i] = val;
    setForm({ ...form, subCategories: sc });
  };

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
        <Select label="Section (Category Grouping)" value={form.sectionId} onChange={(e) => setForm({ ...form, sectionId: e.target.value })} options={[{ value: '', label: 'None' }, ...sections.map((s) => ({ value: s._id, label: s.title }))]} />
        <div>
          <label className="block text-sm font-medium text-tb-gray-700 dark:text-gray-300 mb-1">Sub-Categories (e.g. CHSL, CGL, MTS)</label>
          {form.subCategories.map((sc, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <Input value={sc} onChange={(e) => updateSubCategory(i, e.target.value)} placeholder="e.g. CHSL" />
              <Button variant="ghost" size="sm" onClick={() => removeSubCategory(i)}><X className="w-4 h-4" /></Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addSubCategory}><Plus className="w-3 h-3" /> Add</Button>
        </div>
        <Input label="Order" type="number" value={String(form.order)} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />
        <label className="flex items-center gap-2 text-sm text-tb-gray-700 dark:text-gray-300"><Toggle checked={form.isActive} onChange={(v) => setForm({ ...form, isActive: v })} /> Active</label>
        <Button onClick={onSave} className="w-full mt-2">{editing ? 'Update' : 'Create'}</Button>
      </div>
    </Modal>
  );
};

export default ExamFormModal;
