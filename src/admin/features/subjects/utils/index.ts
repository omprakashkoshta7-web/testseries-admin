import type { IAdminSubject } from '../../../types';

export const getSubjectCategoryId = (subject: IAdminSubject): string => {
  if (!subject.categoryId) return '';
  return typeof subject.categoryId === 'object' ? subject.categoryId._id : subject.categoryId;
};

export const filterSubjects = (items: IAdminSubject[], search: string, categoryFilter: string) => {
  return items.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = !categoryFilter || getSubjectCategoryId(s) === categoryFilter;
    return matchSearch && matchCat;
  });
};