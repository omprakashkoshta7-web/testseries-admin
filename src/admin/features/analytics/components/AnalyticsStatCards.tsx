import React from 'react';
import { Users, BookOpen, DollarSign, Activity } from '@shared/icons';
import type { IAnalyticsData } from '../../../types';

interface AnalyticsStatCardsProps {
  analytics: IAnalyticsData | null;
}

const cards: { label: string; key: keyof IAnalyticsData; icon: React.FC<{ className?: string }>; gradient: string; bg: string; textColor: string; isCurrency?: boolean }[] = [
  { label: 'Total Users', key: 'totalUsers', icon: Users, gradient: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', textColor: 'text-blue-600' },
  { label: 'Total Tests', key: 'totalTests', icon: BookOpen, gradient: 'from-purple-500 to-purple-600', bg: 'bg-purple-50', textColor: 'text-purple-600' },
  { label: 'Total Revenue', key: 'totalRevenue', icon: DollarSign, gradient: 'from-green-500 to-emerald-600', bg: 'bg-green-50', textColor: 'text-green-600', isCurrency: true },
  { label: 'Active Users', key: 'activeUsers', icon: Activity, gradient: 'from-orange-500 to-orange-600', bg: 'bg-orange-50', textColor: 'text-orange-600' },
];

const getValue = (analytics: IAnalyticsData | null, card: (typeof cards)[number]): string => {
  if (!analytics) return '0';
  if (card.isCurrency) return `$${analytics.totalRevenue?.toLocaleString() ?? 0}`;
  return String(analytics[card.key] ?? 0);
};

const AnalyticsStatCards: React.FC<AnalyticsStatCardsProps> = ({ analytics }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    {cards.map((card) => {
      const Icon = card.icon;
      return (
        <div key={card.label} className="group bg-white dark:bg-gray-800 rounded-xl shadow-tb hover:shadow-tb-lg transition-all duration-300 p-5 border border-tb-gray-100/60 dark:border-gray-700/60 hover:-translate-y-0.5">
          <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
            <Icon className={`w-5 h-5 ${card.textColor}`} />
          </div>
          <p className="text-xl font-bold text-tb-navy dark:text-white mt-3">{getValue(analytics, card)}</p>
          <p className="text-sm text-tb-gray-500 dark:text-gray-400">{card.label}</p>
        </div>
      );
    })}
  </div>
);

export default AnalyticsStatCards;
