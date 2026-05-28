import { Mail, MessageSquare, Smartphone } from '@shared/icons';
import type { INotificationForm } from '../../../types';

export const typeOptions = [
  { value: '', label: 'All Types' },
  { value: 'test_launch', label: 'Test Launch' },
  { value: 'result', label: 'Result' },
  { value: 'promotional', label: 'Promotional' },
  { value: 'system', label: 'System' },
  { value: 'reminder', label: 'Reminder' },
];

export const audienceOptions = [
  { value: '', label: 'All Audiences' },
  { value: 'all', label: 'All' },
  { value: 'batch', label: 'Batch' },
  { value: 'individual', label: 'Individual' },
];

export const formTypeOptions = [
  { value: 'test_launch', label: 'Test Launch' },
  { value: 'result', label: 'Result' },
  { value: 'promotional', label: 'Promotional' },
  { value: 'system', label: 'System' },
  { value: 'reminder', label: 'Reminder' },
];

export const formAudienceOptions = [
  { value: 'all', label: 'All' },
  { value: 'batch', label: 'Batch' },
  { value: 'individual', label: 'Individual' },
];

export const channelOptions = [
  { value: 'email', label: 'Email', icon: Mail },
  { value: 'sms', label: 'SMS', icon: MessageSquare },
  { value: 'push', label: 'Push', icon: Smartphone },
];

export const emptyForm: INotificationForm = {
  title: '',
  body: '',
  type: 'system',
  targetAudience: 'all',
  targetIds: [],
  channels: ['email'],
  status: 'draft',
  scheduledAt: undefined,
};
