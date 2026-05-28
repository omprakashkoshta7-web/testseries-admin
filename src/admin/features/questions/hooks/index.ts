import { useAdminSelector } from '../../../store/hooks';

export const useAdminQuestionsState = () => useAdminSelector((state: any) => state.questions);
export { useQuestionFilters } from './useQuestionFilters';
export { useQuestionForm } from './useQuestionForm';
