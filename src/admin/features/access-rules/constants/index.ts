import type { IAccessRuleForm } from '../../../types';

export const emptyForm: IAccessRuleForm & { startDate: string; endDate: string } = {
  role: 'free',
  entityType: 'test',
  entityId: '',
  maxTests: 3,
  isLocked: true,
  startDate: '',
  endDate: '',
};

export const roleOptions = [
  { value: 'free', label: 'Free Users' },
  { value: 'paid', label: 'Paid Users' },
  { value: 'premium', label: 'Premium Users' },
];

export const entityOptions = [
  { value: 'exam', label: 'Exam' },
  { value: 'test', label: 'Test' },
  { value: 'subject', label: 'Subject' },
  { value: 'study_material', label: 'Study Material' },
];
