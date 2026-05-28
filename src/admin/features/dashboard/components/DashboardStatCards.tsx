import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Activity, ShoppingCart, DollarSign, Target, Percent, AlertCircle } from '@shared/icons';
import type { IAdminDashboardStats } from '../../../types';
import { staggerContainer, fadeInUp } from '../../../utils/animations';

interface DashboardStatCardsProps {
  stats: IAdminDashboardStats | null;
}

interface CardConfig {
  label: string;
  icon: React.FC<{ className?: string }>;
  color: string;
  isCurrency?: boolean;
  isPercent?: boolean;
  getValue: (stats: IAdminDashboardStats) => string;
}

const cards: CardConfig[] = [
  { label: 'Total Users', getValue: (s) => String(s.totalUsers), icon: Users, color: 'blue' },
  { label: 'Active Users', getValue: (s) => String(s.activeUsers), icon: Activity, color: 'green' },
  { label: 'Purchased Users', getValue: (s) => String(s.purchasedUsers), icon: ShoppingCart, color: 'purple' },
  { label: 'Total Revenue', getValue: (s) => `₹${s.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'green', isCurrency: true },
  { label: 'Tests Attempted', getValue: (s) => String(s.attemptsCount), icon: Target, color: 'orange' },
  { label: 'Conversion Rate', getValue: (s) => `${s.conversionRate}%`, icon: Percent, color: 'blue', isPercent: true },
  { label: 'Pending Reviews', getValue: (s) => String(s.pendingReviews), icon: AlertCircle, color: 'red' },
];

const colorMap: Record<string, { bg: string; icon: string }> = {
  blue: { bg: 'from-indigo-50/60 to-blue-50/40 dark:from-indigo-900/20 dark:to-blue-900/10', icon: 'bg-indigo-100 dark:bg-indigo-900/40 text-admin-primary' },
  green: { bg: 'from-emerald-50/60 to-green-50/40 dark:from-emerald-900/20 dark:to-green-900/10', icon: 'bg-emerald-100 dark:bg-emerald-900/40 text-tb-green' },
  orange: { bg: 'from-orange-50/60 to-amber-50/40 dark:from-orange-900/20 dark:to-amber-900/10', icon: 'bg-orange-100 dark:bg-orange-900/40 text-tb-orange' },
  red: { bg: 'from-red-50/60 to-rose-50/40 dark:from-red-900/20 dark:to-rose-900/10', icon: 'bg-red-100 dark:bg-red-900/40 text-tb-red' },
  purple: { bg: 'from-purple-50/60 to-violet-50/40 dark:from-purple-900/20 dark:to-violet-900/10', icon: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600' },
};

const DashboardStatCards: React.FC<DashboardStatCardsProps> = ({ stats }) => (
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    animate="visible"
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4"
  >
    {cards.map((card) => {
      const Icon = card.icon;
      const c = colorMap[card.color] || colorMap.blue;
      return (
        <motion.div
          key={card.label}
          variants={fadeInUp}
          whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(79,70,229,0.1)' }}
          className="admin-card p-4 bg-gradient-to-br group"
        >
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.4 }}
            className={`w-10 h-10 rounded-xl ${c.icon} flex items-center justify-center`}
          >
            <Icon className="w-5 h-5" />
          </motion.div>
          <p className="text-xl font-bold text-tb-navy dark:text-white mt-3">{stats ? card.getValue(stats) : '0'}</p>
          <p className="text-xs text-tb-gray-500 dark:text-gray-400 mt-0.5">{card.label}</p>
        </motion.div>
      );
    })}
  </motion.div>
);

export default DashboardStatCards;
