import React from 'react';
import { motion } from 'framer-motion';
import { Loader } from '@shared/components';
import { Calendar } from '@shared/icons';
import { useDashboard } from '../hooks/useDashboard';
import DashboardStatCards from '../components/DashboardStatCards';
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
          </div>
        </>
      )}
    </motion.div>
  );
};

export default AdminDashboardPage;