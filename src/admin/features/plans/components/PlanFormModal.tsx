import React from 'react';
import { Button, Input, Modal, Toggle } from '@shared/components';
import type { IAdminPlan, IAdminPlanForm } from '../../../types';

interface Props {
  isOpen: boolean;
  editing: IAdminPlan | null;
  form: IAdminPlanForm;
  onFormChange: (form: IAdminPlanForm) => void;
  onSave: () => void;
  onClose: () => void;
}

const PlanFormModal: React.FC<Props> = ({ isOpen, editing, form, onFormChange: setForm, onSave, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editing ? 'Edit Plan' : 'Add Plan'}>
      <div className="space-y-4 p-4 max-h-[70vh] overflow-y-auto">
        <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: editing ? form.slug : e.target.value.toLowerCase().replace(/\s+/g, '-') })} />
        <Input label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        <Input label="Duration (months)" type="number" value={String(form.durationMonths)} onChange={(e) => setForm({ ...form, durationMonths: parseInt(e.target.value) || 1 })} />
        <Input label="Price" type="number" value={String(form.price)} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} />
        <Input label="Original Price" type="number" value={String(form.originalPrice)} onChange={(e) => setForm({ ...form, originalPrice: parseFloat(e.target.value) || 0 })} />
        <Input label="Discount %" type="number" value={String(form.discount)} onChange={(e) => setForm({ ...form, discount: parseFloat(e.target.value) || 0 })} />
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-tb-gray-600 dark:text-gray-300">Features (one per line)</label>
          <textarea value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} className="bg-white dark:bg-gray-800 border border-tb-gray-200 dark:border-gray-700 rounded-lg p-2 text-sm text-tb-navy dark:text-white h-24 focus:outline-none focus:ring-2 focus:ring-tb-blue" />
        </div>
        <Input label="Order" type="number" value={String(form.order)} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm text-tb-gray-700 dark:text-gray-300"><Toggle checked={form.isPopular} onChange={(v) => setForm({ ...form, isPopular: v })} /> Popular</label>
          <label className="flex items-center gap-2 text-sm text-tb-gray-700 dark:text-gray-300"><Toggle checked={form.isActive} onChange={(v) => setForm({ ...form, isActive: v })} /> Active</label>
        </div>
        <Button onClick={onSave} className="w-full mt-2">{editing ? 'Update' : 'Create'}</Button>
      </div>
    </Modal>
  );
};

export default PlanFormModal;
