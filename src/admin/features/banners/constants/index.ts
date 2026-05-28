export const BANNER_POSITIONS = ['top', 'middle', 'bottom', 'sidebar'] as const;
export const BANNER_TARGETS = ['_blank', '_self'] as const;

import type { IBannerForm } from '../../../types';

export const positionOptions = [
  { value: 'top', label: 'Top' },
  { value: 'middle', label: 'Middle' },
  { value: 'bottom', label: 'Bottom' },
  { value: 'sidebar', label: 'Sidebar' },
];

export const positionFilterOptions = [
  { value: '', label: 'All Positions' },
  ...positionOptions,
];

export const emptyForm: IBannerForm = {
  title: '',
  subtitle: '',
  image: '',
  link: '',
  position: 'top',
  priority: 0,
  isActive: true,
  startsAt: '',
  expiresAt: '',
};
