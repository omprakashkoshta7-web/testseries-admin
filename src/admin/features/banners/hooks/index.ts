import { useAdminSelector } from '../../../store/hooks';

export const useAdminBannersState = () => useAdminSelector((state: any) => state.banners);
export { useBannerForm } from './useBannerForm';
export { useBannerFilters } from './useBannerFilters';
