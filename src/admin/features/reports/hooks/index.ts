import { useAdminSelector } from '../../../store/hooks';

export { useReports } from './useReports';
export type { Tab } from './useReports';
export { useReportFilters } from './useReportFilters';

export const useAdminReportsState = () => useAdminSelector((state: any) => state.reports);
