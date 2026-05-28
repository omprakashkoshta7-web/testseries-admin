import type { IAdminSubject, ITopic } from '../../../types';

export const getDifficultyColor = (d: string) => {
  if (d === 'easy') return 'bg-green-100 text-green-700';
  if (d === 'medium') return 'bg-yellow-100 text-yellow-700';
  return 'bg-red-100 text-red-700';
};

export const defaultQuestionOptions = [
  { label: 'A', text: 'Option A' },
  { label: 'B', text: 'Option B' },
  { label: 'C', text: 'Option C' },
  { label: 'D', text: 'Option D' },
];

export const resolveSubjectId = (value: string, subjects: IAdminSubject[], selectedCategoryId: string) => {
  if (!value) return '';
  const contentSubjects = subjects.filter((s: IAdminSubject) => {
    if (!s || !s.categoryId) return false;
    const categoryId = typeof s.categoryId === 'object' && s.categoryId !== null ? s.categoryId._id : s.categoryId;
    return !selectedCategoryId || categoryId === selectedCategoryId;
  });
  const found = contentSubjects.find((subject: IAdminSubject) => subject._id === value || subject.name.toLowerCase() === value.toLowerCase());
  return found?._id || value;
};

export const resolveTopicId = (value: string, subjectId: string, topics: ITopic[]) => {
  if (!value || !subjectId) return '';
  const found = topics.find((topic: ITopic) => {
    if (!topic || !topic.subjectId) return false;
    const topicSubjectId = typeof topic.subjectId === 'object' && topic.subjectId !== null ? topic.subjectId._id : topic.subjectId;
    return topicSubjectId === subjectId && (topic._id === value || topic.name.toLowerCase() === value.toLowerCase());
  });
  return found?._id || value;
};

export const normalizeOptions = (options?: Array<{ label?: string; text?: string }>) => {
  if (!Array.isArray(options) || options.length === 0) return defaultQuestionOptions;
  const cleaned = options
    .map((option, index) => ({
      label: option.label || String.fromCharCode(65 + index),
      text: String(option.text || '').trim(),
    }))
    .filter((option) => option.text);
  return cleaned.length > 0 ? cleaned : defaultQuestionOptions;
};
