import React from 'react';
import { motion } from 'framer-motion';
import { Loader } from '@shared/components';
import {
  BookOpen,
  Activity,
  UserPlus,
  CreditCard,
  Percent,
  Calendar,
} from '@shared/icons';
import { useDashboard } from '../hooks/useDashboard';
import DashboardStatCards from '../components/DashboardStatCards';
import DashboardQuickActions from '../components/DashboardQuickActions';
import DashboardRecentActivity from '../components/DashboardRecentActivity';
import { staggerContainer, fadeInUp } from '../../../utils/animations';

const AdminDashboardPage: React.FC = () => {
  const { stats, loading } = useDashboard();

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div
        variants={fadeInUp}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-tb-navy via-indigo-900 to-violet-900 p-6 sm:p-8"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-20 -right-20 w-60 h-60 bg-admin-primary/20 rounded-full blur-3xl"
        />
        <div className="relative">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Welcome back, Admin</h1>
              <div className="flex items-center gap-2 mt-2 text-blue-200">
                <Calendar className="w-4 h-4" />
                <span>{today}</span>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 border border-white/10"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Activity className="w-5 h-5 text-green-300" />
              </motion.div>
              <div>
                <p className="text-xs text-blue-200">System Status</p>
                <p className="text-sm font-semibold text-green-300">All systems operational</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center py-12"
        >
          <Loader size="lg" />
        </motion.div>
      ) : (
        <>
          <DashboardStatCards stats={stats} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <DashboardRecentActivity activities={stats?.recentActivity ?? []} />

            <div className="space-y-4">
              <DashboardQuickActions />

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.45 }}
                className="admin-card-solid"
              >
                <div className="admin-card-header">
                  <h3 className="text-base font-bold text-tb-navy dark:text-white">Today's Summary</h3>
                </div>
                <div className="p-5 space-y-5">
                  {[
                    { label: 'New Users', value: stats?.newUsersToday ?? 0, icon: UserPlus, color: 'blue' },
                    { label: 'Tests Taken', value: stats?.testsTakenToday ?? 0, icon: BookOpen, color: 'purple' },
                    { label: 'Revenue Today', value: `₹${(stats?.revenueToday ?? 0).toLocaleString()}`, icon: CreditCard, color: 'green' },
                  ].map((item, i) => (
                    <React.Fragment key={item.label}>
                      {i > 0 && <div className="border-t border-tb-gray-100 dark:border-gray-700" />}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/20">
                            <item.icon className="w-4 h-4 text-admin-primary dark:text-admin-primary-light" />
                          </div>
                          <span className="text-sm text-tb-gray-600 dark:text-gray-300">{item.label}</span>
                        </div>
                        <span className="text-lg font-bold text-tb-navy dark:text-white">{item.value}</span>
                      </motion.div>
                    </React.Fragment>
                  ))}
                  <div className="border-t border-tb-gray-100 dark:border-gray-700" />
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-tb-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                        <Percent className="w-3.5 h-3.5 text-admin-primary" />
                        Test Completion Rate
                      </span>
                      <span className="font-bold text-tb-navy dark:text-white">{stats?.testCompletionRate ?? 0}%</span>
                    </div>
                    <div className="w-full bg-tb-gray-100 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stats?.testCompletionRate ?? 0}%` }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.6 }}
                        className="bg-gradient-to-r from-admin-primary to-indigo-500 rounded-full h-2.5"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default AdminDashboardPage;