import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Activity } from '@shared/icons';
import { Badge } from '@shared/components';
import { staggerFast, rowVariants } from '../../../utils/animations';

interface ActivityItem {
  id: string;
  userName: string;
  action: string;
  time: string;
  type: string;
}

interface DashboardRecentActivityProps {
  activities: ActivityItem[];
}

const DashboardRecentActivity: React.FC<DashboardRecentActivityProps> = ({ activities }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.15 }}
    className="lg:col-span-2 admin-card-solid overflow-hidden"
  >
    <div className="admin-card-header flex items-center justify-between">
      <h3 className="text-base font-bold text-tb-navy dark:text-white">Recent Activity</h3>
      <motion.button
        whileHover={{ x: 4 }}
        className="text-sm font-medium text-admin-primary hover:text-admin-primary-dark transition-colors"
      >
        View All
      </motion.button>
    </div>
    <div className="overflow-x-auto">
      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Action</th>
            <th>Time</th>
            <th className="text-right">Type</th>
          </tr>
        </thead>
        <motion.tbody
          variants={staggerFast}
          initial="hidden"
          animate="visible"
        >
          {activities.length > 0 ? (
            activities.map((activity) => (
              <motion.tr
                key={activity.id}
                variants={rowVariants}
                className="hover:bg-gradient-to-r hover:from-indigo-50/40 hover:to-blue-50/40 dark:hover:from-indigo-900/20 dark:hover:to-blue-900/20 transition-all duration-200"
              >
                <td>
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-8 h-8 bg-gradient-to-br from-admin-primary to-indigo-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm"
                    >
                      {activity.userName?.charAt(0)?.toUpperCase() ?? '?'}
                    </motion.div>
                    <span className="font-medium text-tb-navy dark:text-white">{activity.userName}</span>
                  </div>
                </td>
                <td className="text-tb-gray-600 dark:text-gray-300">{activity.action}</td>
                <td>
                  <div className="flex items-center gap-1.5 text-tb-gray-500 dark:text-gray-400">
                    <Clock className="w-3.5 h-3.5" />
                    {activity.time}
                  </div>
                </td>
                <td className="text-right">
                  <Badge variant={activity.type === 'payment' ? 'success' : activity.type === 'user' ? 'primary' : 'warning'}>
                    {activity.type}
                  </Badge>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-12 text-center text-tb-gray-400 dark:text-gray-500">
                <div className="flex flex-col items-center">
                  <Activity className="w-8 h-8 mb-2" />
                  <p className="text-sm">No recent activity</p>
                </div>
              </td>
            </tr>
          )}
        </motion.tbody>
      </table>
    </div>
  </motion.div>
);

export default DashboardRecentActivity;