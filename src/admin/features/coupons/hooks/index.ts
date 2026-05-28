import { useAdminSelector } from '../../../store/hooks';

export const useAdminCouponsState = () => useAdminSelector((state: any) => state.coupons);

export { useCoupons } from './useCoupons';
