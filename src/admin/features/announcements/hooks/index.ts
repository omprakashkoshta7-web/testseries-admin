import { useAdminSelector } from '../../../store/hooks';

export const useAdminAnnouncementsState = () => useAdminSelector((state: any) => state.announcements);