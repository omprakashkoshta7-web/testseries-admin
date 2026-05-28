import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Layers, FileText, CreditCard, Bell } from '@shared/icons';
import { staggerContainer, fadeInUp } from '../../../utils/animations';

const actions = [
  { label: 'Create Exam', path: '/admin/exams', icon: Layers, desc: 'Add a new exam under a category', color: 'indigo' },
  { label: 'Create Test', path: '/admin/tests', icon: FileText, desc: 'Create test series and assessments', color: 'violet' },
  { label: 'View Orders', path: '/admin/payments', icon: CreditCard, desc: 'View payments and invoices', color: 'emerald' },
  { label: 'Send Notification', path: '/admin/notifications', icon: Bell, desc: 'Send alerts to users', color: 'amber' },
];

const colorMap: Record<string, { bg: string; icon: string }> = {
  indigo: { bg: 'bg-indigo-50 dark:bg-indigo-900/20', icon: 'text-indigo-600 dark:text-indigo-400' },
  violet: { bg: 'bg-violet-50 dark:bg-violet-900/20', icon: 'text-violet-600 dark:text-violet-400' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', icon: 'text-emerald-600 dark:text-emerald-400' },
  amber: { bg: 'bg-amber-50 dark:bg-amber-900/20', icon: 'text-amber-600 dark:text-amber-400' },
};

const DashboardQuickActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="admin-card-solid"
    >
      <div className="admin-card-header">
        <h3 className="text-base font-bold text-tb-navy dark:text-white">Quick Actions</h3>
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="p-4 space-y-2"
      >
        {actions.map((action) => {
          const Icon = action.icon;
          const c = colorMap[action.color] || colorMap.indigo;
          return (
            <motion.button
              key={action.path}
              variants={fadeInUp}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => navigate(action.path)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-tb-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 group"
            >
              <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center flex-shrink-0 transition-transform`}>
                <Icon className={`w-5 h-5 ${c.icon}`} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-tb-navy dark:text-white group-hover:text-admin-primary transition-colors">{action.label}</p>
                <p className="text-xs text-tb-gray-500 dark:text-gray-400 mt-0.5">{action.desc}</p>
              </div>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <ArrowRight className="w-4 h-4 text-tb-gray-300 dark:text-gray-600 group-hover:text-admin-primary transition-colors" />
              </motion.div>
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default DashboardQuickActions;