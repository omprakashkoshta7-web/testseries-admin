import React from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, Target } from '@shared/icons';
import type { IAnalyticsData } from '../../../types';
import { staggerContainer, fadeInUp } from '../../../utils/animations';

interface SummaryCardsProps {
  analytics: IAnalyticsData;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ analytics }) => (
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    animate="visible"
    className="grid grid-cols-1 lg:grid-cols-3 gap-6"
  >
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(79,70,229,0.1)' }}
      className="admin-card-solid p-5"
    >
      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.4 }}
          className="w-14 h-14 bg-gradient-to-br from-admin-primary to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
        >
          <Target className="w-7 h-7 text-white" />
        </motion.div>
        <div>
          <p className="text-3xl font-bold text-tb-navy dark:text-white">{analytics.averageScore}%</p>
          <p className="text-sm text-tb-gray-500 dark:text-gray-400">Overall average score</p>
        </div>
      </div>
    </motion.div>
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(16,185,129,0.1)' }}
      className="admin-card-solid p-5"
    >
      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.4 }}
          className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200 dark:shadow-emerald-900/30"
        >
          <Award className="w-7 h-7 text-white" />
        </motion.div>
        <div>
          <p className="text-3xl font-bold text-tb-navy dark:text-white">{analytics.completionRate}%</p>
          <p className="text-sm text-tb-gray-500 dark:text-gray-400">Tests completed</p>
        </div>
      </div>
    </motion.div>
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(139,92,246,0.1)' }}
      className="admin-card-solid p-5"
    >
      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.4 }}
          className="w-14 h-14 bg-gradient-to-br from-violet-400 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-200 dark:shadow-violet-900/30"
        >
          <Clock className="w-7 h-7 text-white" />
        </motion.div>
        <div>
          <p className="text-3xl font-bold text-tb-navy dark:text-white uppercase">{analytics.period}</p>
          <p className="text-sm text-tb-gray-500 dark:text-gray-400">Selected period</p>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default SummaryCards;