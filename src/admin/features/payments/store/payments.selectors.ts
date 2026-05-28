import type { AdminRootState } from '../../../store';

export const selectAdminPayments = (state: AdminRootState) => state.payments.payments;
export const selectAdminPaymentsLoading = (state: AdminRootState) => state.payments.loading;
export const selectPaymentsSummary = (state: AdminRootState) => ({
  totalRevenue: state.payments.totalRevenue,
  activePlans: state.payments.activePlans,
  pendingAmount: state.payments.pendingAmount,
  refundedAmount: state.payments.refundedAmount,
});
