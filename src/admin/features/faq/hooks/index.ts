import { useAdminSelector } from '../../../store/hooks';

export const useAdminFaqState = () => useAdminSelector((state: any) => state.faq);

export { useFaqs } from './useFaqs';
export { useFaqFilters } from './useFaqFilters';
