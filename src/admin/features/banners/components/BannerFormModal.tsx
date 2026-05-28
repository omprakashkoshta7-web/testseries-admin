import React from 'react';
import { Modal, Button, Input, Select } from '@shared/components';
import { positionOptions } from '../constants';
import type { IBanner, IBannerForm } from '../../../types';

interface BannerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: IBannerForm;
  onChange: (form: IBannerForm) => void;
  onSubmit: () => void;
  editingBanner: IBanner | null;
}

const BannerFormModal: React.FC<BannerFormModalProps> = ({
  isOpen, onClose, form, onChange, onSubmit, editingBanner,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingBanner ? 'Edit Banner' : 'Create Banner'}
      size="lg"
      footer={
        <div className="flex gap-3">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={onSubmit}>{editingBanner ? 'Update' : 'Create'}</Button>
        </div>
      }
    >
      <div className="space-y-4">
        <Input label="Title" value={form.title} onChange={(e) => onChange({ ...form, title: e.target.value })} required />
        <Input label="Subtitle" value={form.subtitle} onChange={(e) => onChange({ ...form, subtitle: e.target.value })} />
        <Input label="Image URL" type="url" value={form.image} onChange={(e) => onChange({ ...form, image: e.target.value })} required />
        <Input label="Link URL" type="url" value={form.link} onChange={(e) => onChange({ ...form, link: e.target.value })} />
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Position"
            options={positionOptions}
            value={form.position}
            onChange={(e) => onChange({ ...form, position: e.target.value as 'top' | 'middle' | 'bottom' | 'sidebar' })}
          />
          <Input label="Priority" type="number" value={form.priority} onChange={(e) => onChange({ ...form, priority: Number(e.target.value) })} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Starts At" type="date" value={form.startsAt ? form.startsAt.slice(0, 10) : ''} onChange={(e) => onChange({ ...form, startsAt: e.target.value })} />
          <Input label="Expires At" type="date" value={form.expiresAt ? form.expiresAt.slice(0, 10) : ''} onChange={(e) => onChange({ ...form, expiresAt: e.target.value })} />
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => onChange({ ...form, isActive: e.target.checked })}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-secondary-700">Active</span>
        </label>
      </div>
    </Modal>
  );
};

export default BannerFormModal;
