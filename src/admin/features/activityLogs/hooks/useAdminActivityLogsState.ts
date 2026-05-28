import { useAdminSelector } from '../../../store/hooks';

export const useAdminActivityLogsState = () => useAdminSelector((state: any) => state.activityLogs);
