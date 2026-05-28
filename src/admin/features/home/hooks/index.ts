import { useAdminSelector } from '../../../store/hooks';

export const useAdminHomeState = () => useAdminSelector((state: any) => state.homeContent);

export { useHomeContents } from './useHomeContents';
export { useHomeContentFilters } from './useHomeContentFilters';
