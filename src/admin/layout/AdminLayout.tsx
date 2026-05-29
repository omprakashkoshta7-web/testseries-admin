import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { ToastProvider } from '../utils/ToastContext';
import { AdminThemeProvider, useAdminTheme } from '../context/AdminThemeContext';
import { pageTransition } from '../utils/animations';
const pageTitles: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/users': 'Users',
  '/admin/tests': 'Tests',
  '/admin/payments': 'Payments',
  '/admin/analytics': 'Analytics',
  '/admin/settings': 'Settings',
  '/admin/study-materials': 'Study Materials',
  '/admin/questions': 'Questions',
  '/admin/coupons': 'Coupons',
  '/admin/notifications': 'Notifications',
  '/admin/tickets': 'Tickets',
  '/admin/banners': 'Banners',
  '/admin/faqs': 'FAQs',
  '/admin/announcements': 'Announcements',
  '/admin/batches': 'Batches & Groups',
  '/admin/activity-logs': 'Activity Logs',
  '/admin/reports': 'Reports',
  '/admin/exam-categories': 'Exam Categories',
  '/admin/exams': 'Exams',
  '/admin/exam-sections': 'Exam Sections',
  '/admin/subjects': 'Subjects',
  '/admin/topics': 'Topics',
  '/admin/plans': 'Plans',
  '/admin/access-rules': 'Access Rules',
  '/admin/reviews': 'Reviews',
  '/admin/bookmarks': 'Bookmarks',
  '/admin/leaderboard': 'Leaderboard',
  '/admin/home': 'Home Content',
  '/admin/enrollments': 'Enrollments',
  '/admin/material-purchases': 'Material Purchases',
};

const LayoutInner: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { sidebarCollapsed } = useAdminTheme();

  const basePath = '/' + location.pathname.split('/').slice(0, 3).join('/');
  const title = pageTitles[basePath] || 'Admin';

  return (
    <div className={`h-screen bg-[linear-gradient(135deg,#f8fafc_0%,#eef4ff_52%,#f8fafc_100%)] dark:bg-[linear-gradient(135deg,#030712_0%,#111827_60%,#030712_100%)] flex overflow-hidden ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 h-screen">
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} title={title} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pt-3 sm:pt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

const AdminLayout: React.FC = () => (
  <AdminThemeProvider>
    <ToastProvider>
      <LayoutInner />
    </ToastProvider>
  </AdminThemeProvider>
);

export default AdminLayout;
