export const STUDY_CATEGORIES = ['notes', 'video', 'pdf', 'quiz'] as const;
export const STUDY_FORM_DEFAULTS = {
  category: 'notes',
  duration: 30,
  isActive: true,
};

export const categoryOptions = [
  { value: 'notes', label: 'Notes' }, { value: 'pdf', label: 'PDF' },
  { value: 'video', label: 'Video' }, { value: 'pyq', label: 'PYQ' },
  { value: 'short-notes', label: 'Short Notes' }, { value: 'revision', label: 'Revision' },
];

export const iconOptions = [
  { value: 'BookOpen', label: '📖 Book' }, { value: 'Calculator', label: '🔢 Calculator' },
  { value: 'Atom', label: '⚛️ Atom' }, { value: 'Leaf', label: '🌿 Leaf' },
  { value: 'Landmark', label: '🏛️ Landmark' }, { value: 'Scale', label: '⚖️ Scale' },
];
