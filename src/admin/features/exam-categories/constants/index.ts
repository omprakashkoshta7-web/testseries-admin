import type { IExamCategoryForm } from '../../../types';

export const emptyForm: IExamCategoryForm = {
  name: '',
  slug: '',
  description: '',
  icon: 'BookOpen',
  color: 'from-blue-500 to-blue-600',
  image: '',
  order: 0,
};

export const iconOptions = [
  { value: 'BookOpen', label: 'BookOpen' },
  { value: 'GraduationCap', label: 'GraduationCap' },
  { value: 'Calculator', label: 'Calculator' },
  { value: 'Flask', label: 'Flask' },
  { value: 'Globe', label: 'Globe' },
  { value: 'Heart', label: 'Heart' },
  { value: 'Scale', label: 'Scale' },
  { value: 'PenTool', label: 'PenTool' },
];
