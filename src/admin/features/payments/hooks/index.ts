import { useAdminSelector } from '../../../store/hooks';

export { usePayments } from './usePayments';

export const useAdminPaymentsState = () => useAdminSelector((state: any) => state.payments);
