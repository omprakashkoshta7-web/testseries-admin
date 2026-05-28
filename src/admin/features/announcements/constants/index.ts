export const ANNOUNCEMENT_TYPES = ['info', 'warning', 'update', 'maintenance'] as const;

import type { IAnnouncementForm } from '../../../types';

export const typeOptions = [
  { value: 'info', label: 'Info' },
  { value: 'warning', label: 'Warning' },
  { value: 'success', label: 'Success' },
  { value: 'alert', label: 'Alert' },
];

export const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

export const audienceOptions = [
  { value: 'all', label: 'All' },
  { value: 'batch', label: 'Batch' },
  { value: 'individual', label: 'Individual' },
];

export const emptyForm: IAnnouncementForm = {
  title: '',
  content: '',
  type: 'info',
  priority: 'medium',
  targetAudience: 'all',
  targetIds: [],
  isActive: true,
  pinned: false,
};

export const typeBadgeVariant: Record<string, 'info' | 'warning' | 'success' | 'alert'> = {
  info: 'info',
  warning: 'warning',
  success: 'success',
  alert: 'alert',
};
