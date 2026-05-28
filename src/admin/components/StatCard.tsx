import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  trend?: { value: string; positive: boolean };
  color?: 'blue' | 'green' | 'orange' | 'red' | 'purple';
  onClick?: () => void;
}

const colorMap = {
  blue: { bg: 'from-indigo-50/60 to-blue-50/40 dark:from-indigo-900/20 dark:to-blue-900/10', icon: 'bg-indigo-100 dark:bg-indigo-900/40 text-admin-primary dark:text-admin-primary-light' },
  green: { bg: 'from-emerald-50/60 to-green-50/40 dark:from-emerald-900/20 dark:to-green-900/10', icon: 'bg-emerald-100 dark:bg-emerald-900/40 text-tb-green' },
  orange: { bg: 'from-orange-50/60 to-amber-50/40 dark:from-orange-900/20 dark:to-amber-900/10', icon: 'bg-orange-100 dark:bg-orange-900/40 text-tb-orange' },
  red: { bg: 'from-red-50/60 to-rose-50/40 dark:from-red-900/20 dark:to-rose-900/10', icon: 'bg-red-100 dark:bg-red-900/40 text-tb-red' },
  purple: { bg: 'from-purple-50/60 to-violet-50/40 dark:from-purple-900/20 dark:to-violet-900/10', icon: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600' },
};

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, trend, color = 'blue', onClick }) => {
  const c = colorMap[color];

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(79,70,229,0.1)' }}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      className={`admin-card p-5 bg-gradient-to-br ${c.bg} ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between mb-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
          className={`w-12 h-12 rounded-xl ${c.icon} flex items-center justify-center`}
        >
          {icon}
        </motion.div>
        {trend && (
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
            trend.positive ? 'bg-emerald-100 dark:bg-emerald-900/30 text-tb-green' : 'bg-red-100 dark:bg-red-900/30 text-tb-red'
          }`}>
            <motion.span
              initial={{ rotate: trend.positive ? -90 : 90 }}
              animate={{ rotate: 0 }}
            >
              {trend.positive ? '↑' : '↓'}
            </motion.span>
            {trend.value}
          </span>
        )}
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-tb-navy dark:text-white mb-1">{value}</p>
      <p className="text-sm text-tb-gray-500 dark:text-gray-400">{label}</p>
    </motion.div>
  );
};

export default StatCard;
