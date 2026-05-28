import { useState } from 'react';
import { useAdminSelector } from '../../../store/hooks';
import type { ITest, IAdminExam, IAdminSubject } from '../../../types';

export const useTestContent = () => {
  const exams = useAdminSelector((s: any) => s.adminExams.items);
  const subjects = useAdminSelector((s: any) => s.adminSubjects.items);

  const [contentTest, setContentTest] = useState<ITest | null>(null);

  const selectedExam = contentTest ? exams.find((e: IAdminExam) => e.name === contentTest.category) : null;
  const selectedCategoryId = selectedExam
    ? typeof selectedExam.categoryId === 'object'
      ? selectedExam.categoryId?._id
      : selectedExam.categoryId
    : '';

  const contentSubjects = subjects.filter((s: IAdminSubject) => {
    const categoryId = typeof s.categoryId === 'object' ? s.categoryId?._id : s.categoryId;
    return !selectedCategoryId || categoryId === selectedCategoryId;
  });

  const openContentModal = (test: ITest) => {
    setContentTest(test);
  };

  return {
    contentTest,
    setContentTest,
    openContentModal,
    selectedCategoryId,
    contentSubjects,
  };
};
