import { useEffect, useState, useCallback } from 'react';
import { useAdminDispatch } from '../../../store/hooks';
import { fetchAdminPayments, refundPayment } from '../store/payments.slice';
import type { IPayment } from '../../../types';
import { useToast } from '../../../utils/ToastContext';

export function usePayments() {
  const dispatch = useAdminDispatch();
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [confirmRefund, setConfirmRefund] = useState<{ id: string; amount: number; transactionId: string } | null>(null);

  const loadPayments = useCallback(() => {
    dispatch(fetchAdminPayments({ search, status: statusFilter, page, limit: 10 }));
  }, [dispatch, search, statusFilter, page]);

  useEffect(() => { loadPayments(); }, [loadPayments]);
  useEffect(() => { setPage(1); }, [search, statusFilter]);

  const handleRefund = (payment: IPayment) => {
    if (payment.status === 'refunded') return;
    setConfirmRefund({ id: payment.id, amount: payment.amount, transactionId: payment.transactionId });
  };

  const handleConfirmRefund = () => {
    if (!confirmRefund) return;
    dispatch(refundPayment(confirmRefund.id));
    showToast(`Refund of $${confirmRefund.amount} processed successfully`, 'success');
    setConfirmRefund(null);
  };

  const getStatusVariant = (status: string): 'success' | 'warning' | 'danger' | 'primary' => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'danger';
      case 'refunded': return 'primary';
      default: return 'primary';
    }
  };

  return {
    search, setSearch,
    statusFilter, setStatusFilter,
    page, setPage,
    confirmRefund, setConfirmRefund,
    handleRefund,
    handleConfirmRefund,
    getStatusVariant,
  };
}
