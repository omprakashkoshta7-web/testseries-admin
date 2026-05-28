import type { IBatchForm, IGroupForm } from '../../../types';

export const emptyBatchForm: IBatchForm = {
  name: '',
  description: '',
  code: '',
  subjects: [],
  startDate: '',
  endDate: '',
  isActive: true,
};

export const emptyGroupForm: IGroupForm = {
  name: '',
  description: '',
};
