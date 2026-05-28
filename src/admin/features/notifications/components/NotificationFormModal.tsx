import React from 'react';
import { Modal, Button, Input, Select, Textarea } from '@shared/components';
import type { INotification, INotificationForm } from '../../../types';

interface ChannelOption {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NotificationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: INotificationForm;
  onChange: (form: INotificationForm) => void;
  onSubmit: () => void;
  editing: INotification | null;
  formTypeOptions: { value: string; label: string }[];
  formAudienceOptions: { value: string; label: string }[];
  channelOptions: ChannelOption[];
}

const NotificationFormModal: React.FC<NotificationFormModalProps> = ({
  isOpen,
  onClose,
  form,
  onChange,
  onSubmit,
  editing,
  formTypeOptions,
  formAudienceOptions,
  channelOptions,
}) => {
  const handleChannelToggle = (channel: 'email' | 'sms' | 'push') => {
    const channels = form.channels.includes(channel)
      ? form.channels.filter((c) => c !== channel)
      : [...form.channels, channel];
    onChange({ ...form, channels });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editing ? 'Edit Notification' : 'Create Notification'}
      size="lg"
      footer={
        <div className="flex gap-3">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={onSubmit}>{editing ? 'Update' : 'Create'}</Button>
        </div>
      }
    >
      <div className="space-y-4">
        <Input label="Title" value={form.title} onChange={(e) => onChange({ ...form, title: e.target.value })} required />
        <Textarea label="Body" value={form.body} onChange={(e) => onChange({ ...form, body: e.target.value })} fullWidth required rows={4} />
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Type"
            options={formTypeOptions}
            value={form.type}
            onChange={(e) => onChange({ ...form, type: e.target.value as INotificationForm['type'] })}
          />
          <Select
            label="Target Audience"
            options={formAudienceOptions}
            value={form.targetAudience}
            onChange={(e) => onChange({ ...form, targetAudience: e.target.value as INotificationForm['targetAudience'] })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1.5">Channels</label>
          <div className="flex gap-3">
            {channelOptions.map((ch) => {
              const selected = form.channels.includes(ch.value as 'email' | 'sms' | 'push');
              const Icon = ch.icon;
              return (
                <label
                  key={ch.value}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-all text-sm ${
                    selected
                      ? 'border-tb-blue bg-tb-blue-light text-tb-blue font-medium'
                      : 'border-gray-200 bg-white text-tb-gray-500 dark:text-gray-400 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={selected}
                    onChange={() => handleChannelToggle(ch.value as 'email' | 'sms' | 'push')}
                  />
                  <Icon className="w-4 h-4" />
                  {ch.label}
                </label>
              );
            })}
          </div>
        </div>
        <Input label="Schedule" type="datetime-local" value={form.scheduledAt || ''} onChange={(e) => onChange({ ...form, scheduledAt: e.target.value || undefined })} />
      </div>
    </Modal>
  );
};

export default NotificationFormModal;
