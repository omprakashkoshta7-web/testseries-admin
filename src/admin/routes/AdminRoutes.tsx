import React, { lazy } from 'react';
import { Provider } from 'react-redux';
import { RouteObject, Navigate } from 'react-router-dom';
import { adminStore } from '../store/store';
import AdminProtectedRoute from './AdminProtectedRoute';
import AdminLayout from '../layout/AdminLayout';

const AdminLoginPage = lazy(() => import('../features/auth/pages/AdminLoginPage').then(m => ({ default: m.default })));
const AdminDashboardPage = lazy(() => import('../features/dashboard/pages/AdminDashboardPage').then(m => ({ default: m.default })));
const AdminUsersPage = lazy(() => import('../features/users/pages/AdminUsersPage').then(m => ({ default: m.default })));
const AdminUserDetailPage = lazy(() => import('../features/users/pages/AdminUserDetailPage').then(m => ({ default: m.default })));
const AdminTestsPage = lazy(() => import('../features/tests/pages/AdminTestsPage').then(m => ({ default: m.default })));
const AdminPaymentsPage = lazy(() => import('../features/payments/pages/AdminPaymentsPage').then(m => ({ default: m.default })));
const AdminAnalyticsPage = lazy(() => import('../features/analytics/pages/AdminAnalyticsPage').then(m => ({ default: m.default })));
const AdminSettingsPage = lazy(() => import('../features/settings/pages/AdminSettingsPage').then(m => ({ default: m.default })));
const AdminQuestionsPage = lazy(() => import('../features/questions/pages/AdminQuestionsPage').then(m => ({ default: m.default })));
const AdminCouponsPage = lazy(() => import('../features/coupons/pages/AdminCouponsPage').then(m => ({ default: m.default })));
const AdminNotificationsPage = lazy(() => import('../features/notifications/pages/AdminNotificationsPage').then(m => ({ default: m.default })));
const AdminTicketsPage = lazy(() => import('../features/tickets/pages/AdminTicketsPage').then(m => ({ default: m.default })));
const AdminTicketDetailPage = lazy(() => import('../features/tickets/pages/AdminTicketDetailPage').then(m => ({ default: m.default })));
const AdminBannersPage = lazy(() => import('../features/banners/pages/AdminBannersPage').then(m => ({ default: m.default })));
const AdminFaqsPage = lazy(() => import('../features/faq/pages/AdminFaqsPage').then(m => ({ default: m.default })));
const AdminAnnouncementsPage = lazy(() => import('../features/announcements/pages/AdminAnnouncementsPage').then(m => ({ default: m.default })));
const AdminBatchesGroupsPage = lazy(() => import('../features/batches/pages/AdminBatchesGroupsPage').then(m => ({ default: m.default })));
const AdminActivityLogsPage = lazy(() => import('../features/activityLogs/pages/AdminActivityLogsPage').then(m => ({ default: m.default })));
const AdminReportsPage = lazy(() => import('../features/reports/pages/AdminReportsPage').then(m => ({ default: m.default })));
const AdminStudyMaterialsPage = lazy(() => import('../features/study/pages/AdminStudyMaterialsPage').then(m => ({ default: m.default })));
const AdminExamCategoriesPage = lazy(() => import('../features/exam-categories/pages/AdminExamCategoriesPage').then(m => ({ default: m.default })));
const AdminExamsPage = lazy(() => import('../features/exams/pages/AdminExamsPage').then(m => ({ default: m.default })));
const AdminSubjectsPage = lazy(() => import('../features/subjects/pages/AdminSubjectsPage').then(m => ({ default: m.default })));
const AdminTopicsPage = lazy(() => import('../features/topics/pages/AdminTopicsPage').then(m => ({ default: m.default })));
const AdminPlansPage = lazy(() => import('../features/plans/pages/AdminPlansPage').then(m => ({ default: m.default })));
const AdminAccessRulesPage = lazy(() => import('../features/access-rules/pages/AdminAccessRulesPage').then(m => ({ default: m.default })));
const AdminReviewsPage = lazy(() => import('../features/reviews/pages/AdminReviewsPage').then(m => ({ default: m.default })));
const AdminBookmarksPage = lazy(() => import('../features/bookmarks/pages/AdminBookmarksPage').then(m => ({ default: m.default })));
const AdminLeaderboardPage = lazy(() => import('../features/leaderboard/pages/AdminLeaderboardPage').then(m => ({ default: m.default })));
const AdminHomePage = lazy(() => import('../features/home/pages/AdminHomePage').then(m => ({ default: m.default })));
const AdminEnrollmentsPage = lazy(() => import('../features/enrollments/pages/AdminEnrollmentsPage').then(m => ({ default: m.default })));
const AdminMaterialPurchasesPage = lazy(() => import('../features/material-purchases/pages/AdminMaterialPurchasesPage').then(m => ({ default: m.default })));

const AdminStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Provider store={adminStore}>{children}</Provider>
);

export const adminRoutes: RouteObject[] = [
  { path: '/admin/login', element: <AdminStoreProvider><AdminLoginPage /></AdminStoreProvider> },
  {
    path: '/admin',
    element: <AdminStoreProvider><AdminProtectedRoute /></AdminStoreProvider>,
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      {
        element: <AdminLayout />,
        children: [
          { path: 'dashboard', element: <AdminDashboardPage /> },
          { path: 'users', element: <AdminUsersPage /> },
          { path: 'users/:id', element: <AdminUserDetailPage /> },
          { path: 'tests', element: <AdminTestsPage /> },
          { path: 'payments', element: <AdminPaymentsPage /> },
          { path: 'analytics', element: <AdminAnalyticsPage /> },
          { path: 'settings', element: <AdminSettingsPage /> },
          { path: 'questions', element: <AdminQuestionsPage /> },
          { path: 'coupons', element: <AdminCouponsPage /> },
          { path: 'notifications', element: <AdminNotificationsPage /> },
          { path: 'tickets', element: <AdminTicketsPage /> },
          { path: 'tickets/:id', element: <AdminTicketDetailPage /> },
          { path: 'banners', element: <AdminBannersPage /> },
          { path: 'faqs', element: <AdminFaqsPage /> },
          { path: 'announcements', element: <AdminAnnouncementsPage /> },
          { path: 'batches', element: <AdminBatchesGroupsPage /> },
          { path: 'activity-logs', element: <AdminActivityLogsPage /> },
          { path: 'reports', element: <AdminReportsPage /> },
          { path: 'study-materials', element: <AdminStudyMaterialsPage /> },
          { path: 'exam-categories', element: <AdminExamCategoriesPage /> },
          { path: 'exams', element: <AdminExamsPage /> },
          { path: 'subjects', element: <AdminSubjectsPage /> },
          { path: 'topics', element: <AdminTopicsPage /> },
          { path: 'plans', element: <AdminPlansPage /> },
          { path: 'access-rules', element: <AdminAccessRulesPage /> },
          { path: 'reviews', element: <AdminReviewsPage /> },
          { path: 'bookmarks', element: <AdminBookmarksPage /> },
          { path: 'leaderboard', element: <AdminLeaderboardPage /> },
          { path: 'home', element: <AdminHomePage /> },
          { path: 'enrollments', element: <AdminEnrollmentsPage /> },
          { path: 'material-purchases', element: <AdminMaterialPurchasesPage /> },
        ],
      },
    ],
  },
];
