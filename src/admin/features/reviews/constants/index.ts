export const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-300',
  review: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300',
  approved: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300',
  rejected: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300',
};

export const emptyForm = { entityType: 'test', entityId: '', status: 'draft', comments: '' };

export const statusFilterOptions = [
  { value: '', label: 'All Status' },
  { value: 'draft', label: 'Draft' },
  { value: 'review', label: 'In Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

export const entityTypeOptions = [
  { value: 'test', label: 'Test' },
  { value: 'question', label: 'Question' },
  { value: 'study_material', label: 'Study Material' },
  { value: 'exam', label: 'Exam' },
];
