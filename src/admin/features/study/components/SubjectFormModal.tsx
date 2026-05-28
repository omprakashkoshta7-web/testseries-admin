import React from 'react';
import { Button, Input, Modal, Select } from '@shared/components';
import { AlertCircle } from '@shared/icons';
import { iconOptions } from '../constants';

interface SubjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingSubject: any;
  form: { name: string; description: string; icon: string; color: string };
  onFormChange: (form: any) => void;
  actionError: string | null;
  onSave: () => void;
}

const SubjectFormModal: React.FC<SubjectFormModalProps> = ({ isOpen, onClose, editingSubject, form, onFormChange, actionError, onSave }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={editingSubject ? 'Edit Subject' : 'Add Subject'}
    footer={<div className="flex gap-3"><Button variant="ghost" onClick={onClose}>Cancel</Button><Button onClick={onSave}>{editingSubject ? 'Update' : 'Create'}</Button></div>}>
    <div className="space-y-4">
      {actionError && <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2"><AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" /><p className="text-sm text-red-600">{actionError}</p></div>}
      <Input label="Name" value={form.name} onChange={(e) => onFormChange({ ...form, name: e.target.value })} required />
      <Input label="Description" value={form.description} onChange={(e) => onFormChange({ ...form, description: e.target.value })} />
      <Select label="Icon" options={iconOptions} value={form.icon} onChange={(e) => onFormChange({ ...form, icon: e.target.value })} />
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-1.5">Color</label>
        <div className="flex items-center gap-3">
          <input type="color" value={form.color} onChange={(e) => onFormChange({ ...form, color: e.target.value })} className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer" />
          <Input value={form.color} onChange={(e) => onFormChange({ ...form, color: e.target.value })} />
        </div>
      </div>
    </div>
  </Modal>
);

export default SubjectFormModal;
