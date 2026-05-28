import React from 'react';
import { DollarSign, CreditCard, Clock, RotateCcw } from '@shared/icons';

interface SummaryCardsProps {
  summary: {
    totalRevenue: number;
    activePlans: number;
    pendingAmount: number;
    refundedAmount: number;
  };
}

const cardsConfig = [
  { label: 'Total Revenue', key: 'totalRevenue' as const, icon: DollarSign, gradient: 'from-green-500 to-emerald-600', bg: 'bg-green-50', textColor: 'text-green-600', prefix: '$' },
  { label: 'Active Plans', key: 'activePlans' as const, icon: CreditCard, gradient: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', textColor: 'text-blue-600', prefix: '' },
  { label: 'Pending', key: 'pendingAmount' as const, icon: Clock, gradient: 'from-yellow-500 to-amber-600', bg: 'bg-yellow-50', textColor: 'text-yellow-600', prefix: '$' },
  { label: 'Refunded', key: 'refundedAmount' as const, icon: RotateCcw, gradient: 'from-red-500 to-rose-600', bg: 'bg-red-50', textColor: 'text-red-600', prefix: '$' },
];

const PaymentSummaryCards: React.FC<SummaryCardsProps> = ({ summary }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    {cardsConfig.map((card) => {
      const Icon = card.icon;
      const value = typeof summary[card.key] === 'number'
        ? `${card.prefix}${(summary[card.key] as number).toLocaleString()}`
        : summary[card.key];
      return (
        <div key={card.label} className="group bg-white dark:bg-gray-800 rounded-xl shadow-tb hover:shadow-tb-lg transition-all duration-300 p-5 border border-tb-gray-100/60 dark:border-gray-700/60 hover:-translate-y-0.5">
          <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
            <Icon className={`w-5 h-5 ${card.textColor}`} />
          </div>
          <p className="text-xl font-bold text-tb-navy dark:text-white mt-3">{value}</p>
          <p className="text-sm text-tb-gray-500 dark:text-gray-400">{card.label}</p>
        </div>
      );
    })}
  </div>
);

export default PaymentSummaryCards;
