import React from 'react';
import { Button, Input, Modal, Select, Textarea } from '@shared/components';
import type { IFaq, IFaqForm } from '../../../types';

const categoryOptions = [
  { value: 'General', label: 'General' },
  { value: 'Account', label: 'Account' },
  { value: 'Payment', label: 'Payment' },
  { value: 'Exam', label: 'Exam' },
  { value: 'Technical', label: 'Technical' },
  { value: 'Other', label: 'Other' },
];

interface FaqFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingFaq: IFaq | null;
  form: IFaqForm;
  onFormChange: (form: IFaqForm) => void;
  onSave: () => void;
}

const FaqFormModal: React.FC<FaqFormModalProps> = ({ isOpen, onClose, editingFaq, form, onFormChange, onSave }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={editingFaq ? 'Edit FAQ' : 'Create FAQ'} size="lg"
    footer={<div className="flex gap-3"><Button variant="ghost" onClick={onClose}>Cancel</Button><Button onClick={onSave}>{editingFaq ? 'Update' : 'Create'}</Button></div>}>
    <div className="space-y-4">
      <Textarea label="Question" value={form.question} onChange={(e) => onFormChange({ ...form, question: e.target.value })} fullWidth required />
      <Textarea label="Answer" value={form.answer} onChange={(e) => onFormChange({ ...form, answer: e.target.value })} fullWidth required rows={4} />
      <div className="grid grid-cols-2 gap-4">
        <Select label="Category" options={categoryOptions} value={form.category} onChange={(e) => onFormChange({ ...form, category: e.target.value })} />
        <Input label="Order" type="number" value={form.order} onChange={(e) => onFormChange({ ...form, order: Number(e.target.value) })} />
      </div>
      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" checked={form.isActive} onChange={(e) => onFormChange({ ...form, isActive: e.target.checked })} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
        <span className="text-sm font-medium text-secondary-700">Active</span>
      </label>
    </div>
  </Modal>
);

export default FaqFormModal;
