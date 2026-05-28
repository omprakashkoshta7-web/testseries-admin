import { useAdminSelector } from '../../../store/hooks';

export const useAdminNotificationsState = () => useAdminSelector((state: any) => state.notifications);
export { useNotificationCrud } from './useNotificationCrud';
