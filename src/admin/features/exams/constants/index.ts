import type { IAdminExamForm } from '../../../types';

export const emptyForm: IAdminExamForm = {
  name: '',
  slug: '',
  categoryId: '',
  description: '',
  icon: 'FileText',
  color: 'from-blue-500 to-blue-600',
  bannerUrl: '',
  difficulty: 'medium',
  isActive: true,
  order: 0,
  group: '',
};
