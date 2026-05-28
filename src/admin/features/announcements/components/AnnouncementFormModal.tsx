import React from 'react';
import { Modal, Button, Input, Select, Textarea } from '@shared/components';
import { AlertCircle } from '@shared/icons';
import { typeOptions, priorityOptions, audienceOptions } from '../constants';
import type { IAnnouncementForm } from '../../../types';

interface AnnouncementFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: IAnnouncementForm;
  onChange: (form: IAnnouncementForm) => void;
  onSubmit: () => void;
  editingId: string | null;
  actionError: string | null;
}

const AnnouncementFormModal: React.FC<AnnouncementFormModalProps> = ({
  isOpen, onClose, form, onChange, onSubmit, editingId, actionError,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingId ? 'Edit Announcement' : 'Create Announcement'}
      size="lg"
      footer={
        <div className="flex gap-3">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={onSubmit}>{editingId ? 'Update' : 'Create'}</Button>
        </div>
      }
    >
      <div className="space-y-4">
        {actionError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-600">{actionError}</p>
          </div>
        )}
        <Input label="Title" value={form.title} onChange={(e) => onChange({ ...form, title: e.target.value })} required />
        <Textarea label="Content" value={form.content} onChange={(e) => onChange({ ...form, content: e.target.value })} fullWidth required rows={4} />
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Type"
            options={typeOptions}
            value={form.type}
            onChange={(e) => onChange({ ...form, type: e.target.value as 'info' | 'warning' | 'success' | 'alert' })}
          />
          <Select
            label="Priority"
            options={priorityOptions}
            value={form.priority}
            onChange={(e) => onChange({ ...form, priority: e.target.value as 'low' | 'medium' | 'high' })}
          />
        </div>
        <Select
          label="Target Audience"
          options={audienceOptions}
          value={form.targetAudience}
          onChange={(e) => onChange({ ...form, targetAudience: e.target.value as 'all' | 'batch' | 'individual' })}
        />
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => onChange({ ...form, isActive: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-tb-blue focus:ring-tb-blue"
            />
            <span className="text-sm font-medium text-secondary-700">Active</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.pinned}
              onChange={(e) => onChange({ ...form, pinned: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-tb-blue focus:ring-tb-blue"
            />
            <span className="text-sm font-medium text-secondary-700">Pinned</span>
          </label>
        </div>
      </div>
    </Modal>
  );
};

export default AnnouncementFormModal;
