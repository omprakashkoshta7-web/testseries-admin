import React from 'react';
import { useAdminSelector } from '../../../store/hooks';
import { usePayments } from '../hooks';
import { selectAdminPayments, selectAdminPaymentsLoading, selectPaymentsSummary } from '../store/payments.selectors';
import { Button, Badge, Input, Select, Loader } from '@shared/components';
import {
  Search,
  RotateCcw,
  Wallet,
  CreditCard,
  Clock,
} from '@shared/icons';
import type { IPayment } from '../../../types';
import ConfirmModal from '../../../components/ConfirmModal';
import DeleteAllButton from '../../../components/DeleteAllButton';
import PageHeader from '../../../components/PageHeader';
import PaymentSummaryCards from '../components/PaymentSummaryCards';

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'completed', label: 'Completed' },
  { value: 'pending', label: 'Pending' },
  { value: 'failed', label: 'Failed' },
  { value: 'refunded', label: 'Refunded' },
];

const AdminPaymentsPage: React.FC = () => {
  const payments = useAdminSelector(selectAdminPayments);
  const loading = useAdminSelector(selectAdminPaymentsLoading);
  const summary = useAdminSelector(selectPaymentsSummary);

  const {
    search, setSearch,
    statusFilter, setStatusFilter,
    page, setPage,
    confirmRefund, setConfirmRefund,
    handleRefund,
    handleConfirmRefund,
    getStatusVariant,
  } = usePayments();

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Payments"
        subtitle="Manage transactions and revenue"
        actions={<DeleteAllButton resource="payments" displayName="Payments" />}
      />

      {summary.totalRevenue > 0 && <PaymentSummaryCards summary={summary} />}

      <div className="admin-card-solid p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Search by transaction ID, user, or plan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>
          <div className="w-full sm:w-44">
            <Select options={statusOptions} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader size="lg" /></div>
      ) : payments.length === 0 ? (
        <div className="admin-card-solid">
          <div className="flex flex-col items-center justify-center py-16">
            <Wallet className="w-12 h-12 text-tb-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-tb-navy dark:text-white mb-1">No payments found</h3>
            <p className="text-tb-gray-500 dark:text-gray-400 text-sm">No transactions match your criteria</p>
          </div>
        </div>
      ) : (
        <div className="admin-card-solid overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-tb-gray-50/80 dark:bg-gray-800/50">
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Transaction</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Plan</th>
                  <th className="text-right py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="text-left py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="text-center py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="text-right py-3.5 px-4 text-xs font-semibold text-tb-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tb-gray-50 dark:divide-gray-700/30">
                {payments.map((payment: IPayment) => (
                  <tr key={payment.id} className="hover:bg-tb-gray-50/50 dark:hover:bg-gray-700/30">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-tb-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-4 h-4 text-tb-gray-500 dark:text-gray-400" />
                        </div>
                        <span className="font-mono text-xs font-medium text-tb-navy dark:text-white">{payment.transactionId}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div>
                        <p className="font-semibold text-tb-navy dark:text-white">{payment.userName}</p>
                        <p className="text-xs text-tb-gray-500 dark:text-gray-400 mt-0.5">{payment.userEmail}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-tb-gray-600">{payment.plan}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="text-base font-bold text-tb-navy dark:text-white">${payment.amount.toLocaleString()}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-tb-gray-500 dark:text-gray-400 text-xs">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(payment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <Badge variant={getStatusVariant(payment.status)}>{payment.status}</Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={payment.status === 'refunded'}
                        onClick={() => handleRefund(payment)}
                        className="group-hover:opacity-100 opacity-70"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Refund
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <ConfirmModal
        isOpen={!!confirmRefund}
        title="Confirm Refund"
        message={confirmRefund ? `Refund $${confirmRefund.amount} for transaction ${confirmRefund.transactionId}?` : ''}
        confirmLabel="Refund"
        onConfirm={handleConfirmRefund}
        onCancel={() => setConfirmRefund(null)}
      />
    </div>
  );
};

export default AdminPaymentsPage;
