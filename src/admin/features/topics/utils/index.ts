import type { ITopic, IAdminSubject } from '../../../types';

export const getSubjectName = (topic: ITopic, subjects: IAdminSubject[]): string => {
  const id = typeof topic.subjectId === 'object' ? topic.subjectId?._id : topic.subjectId;
  return subjects.find((s) => s._id === id)?.name || 'N/A';
};