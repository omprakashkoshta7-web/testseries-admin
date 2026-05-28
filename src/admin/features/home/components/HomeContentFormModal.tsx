import React from 'react';
import { Button, Input, Modal, Select, Textarea } from '@shared/components';
import type { IHomeContentForm } from '../../../types';

const typeOptions = [
  { value: 'text', label: 'Text' },
  { value: 'rich-text', label: 'Rich Text' },
  { value: 'image', label: 'Image' },
  { value: 'json', label: 'JSON' },
];

const sectionOptions = [
  { value: 'hero', label: 'Hero' },
  { value: 'features', label: 'Features' },
  { value: 'stats', label: 'Stats' },
  { value: 'testimonials', label: 'Testimonials' },
  { value: 'cta', label: 'CTA' },
  { value: 'footer', label: 'Footer' },
  { value: 'general', label: 'General' },
];

interface HomeContentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingItem: any;
  form: IHomeContentForm;
  onFormChange: (form: IHomeContentForm) => void;
  onSave: () => void;
}

const HomeContentFormModal: React.FC<HomeContentFormModalProps> = ({ isOpen, onClose, editingItem, form, onFormChange, onSave }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={editingItem ? 'Edit Content' : 'Create Content'} size="lg"
    footer={<div className="flex gap-3"><Button variant="ghost" onClick={onClose}>Cancel</Button><Button onClick={onSave}>{editingItem ? 'Update' : 'Create'}</Button></div>}>
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input label="Key" value={form.key} onChange={(e) => onFormChange({ ...form, key: e.target.value })} required placeholder="e.g. hero_title" />
        <Input label="Label" value={form.label} onChange={(e) => onFormChange({ ...form, label: e.target.value })} required placeholder="e.g. Hero Title" />
      </div>
      <Textarea label="Value" value={form.value} onChange={(e) => onFormChange({ ...form, value: e.target.value })} fullWidth required rows={4} placeholder="Content value" />
      <div className="grid grid-cols-2 gap-4">
        <Select label="Type" options={typeOptions} value={form.type} onChange={(e) => onFormChange({ ...form, type: e.target.value as IHomeContentForm['type'] })} />
        <Select label="Section" options={sectionOptions} value={form.section} onChange={(e) => onFormChange({ ...form, section: e.target.value })} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Order" type="number" value={form.order} onChange={(e) => onFormChange({ ...form, order: Number(e.target.value) })} />
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.isActive} onChange={(e) => onFormChange({ ...form, isActive: e.target.checked })} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm font-medium text-secondary-700">Active</span>
          </label>
        </div>
      </div>
    </div>
  </Modal>
);

export default HomeContentFormModal;
