import type { IAdminExam } from '../../../types';

export const getCategoryId = (exam: IAdminExam): string =>
  typeof exam.categoryId === 'object' ? exam.categoryId._id : exam.categoryId;

export const getCategoryName = (exam: IAdminExam, fallback = 'N/A'): string =>
  typeof exam.categoryId === 'object' ? exam.categoryId.name : fallback;

export const filterExams = (items: IAdminExam[], search: string, categoryFilter: string): IAdminExam[] =>
  items.filter((e) => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = !categoryFilter || getCategoryId(e) === categoryFilter;
    return matchSearch && matchCat;
  });
