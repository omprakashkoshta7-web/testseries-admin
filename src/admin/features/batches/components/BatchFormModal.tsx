import React from 'react';
import { Modal, Button, Input, Textarea } from '@shared/components';
import type { IBatchForm } from '../../../types';

interface BatchFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editing: boolean;
  values: IBatchForm;
  onChange: (field: keyof IBatchForm, value: any) => void;
  onSubmit: () => void;
}

const BatchFormModal: React.FC<BatchFormModalProps> = ({ isOpen, onClose, editing, values, onChange, onSubmit }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editing ? 'Edit Batch' : 'Create Batch'}
      size="lg"
      footer={
        <div className="flex gap-3">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={onSubmit}>{editing ? 'Update' : 'Create'}</Button>
        </div>
      }
    >
      <div className="space-y-4">
        <Input label="Name" value={values.name} onChange={(e) => onChange('name', e.target.value)} required />
        <Textarea label="Description" value={values.description} onChange={(e) => onChange('description', e.target.value)} />
        <Input label="Code" value={values.code} onChange={(e) => onChange('code', e.target.value)} placeholder="Auto-generated if empty" />
        <Input
          label="Subjects (comma separated)"
          value={values.subjects.join(', ')}
          onChange={(e) => onChange('subjects', e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))}
          placeholder="Math, Science, English"
        />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Start Date" type="date" value={values.startDate} onChange={(e) => onChange('startDate', e.target.value)} />
          <Input label="End Date" type="date" value={values.endDate} onChange={(e) => onChange('endDate', e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={values.isActive}
              onChange={(e) => onChange('isActive', e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-tb-blue focus:ring-tb-blue"
            />
            <span className="text-sm font-medium text-secondary-700">Active</span>
          </label>
        </div>
      </div>
    </Modal>
  );
};

export default BatchFormModal;
