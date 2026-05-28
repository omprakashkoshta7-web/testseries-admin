import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/store/auth.slice';
import dashboardReducer from '../features/dashboard/store/dashboard.slice';
import usersReducer from '../features/users/store/users.slice';
import testsReducer from '../features/tests/store/tests.slice';
import paymentsReducer from '../features/payments/store/payments.slice';
import analyticsReducer from '../features/analytics/store/analytics.slice';
import questionsReducer from '../features/questions/store/questions.slice';
import couponsReducer from '../features/coupons/store/coupons.slice';
import notificationsReducer from '../features/notifications/store/notifications.slice';
import ticketsReducer from '../features/tickets/store/tickets.slice';
import bannersReducer from '../features/banners/store/banners.slice';
import faqReducer from '../features/faq/store/faq.slice';
import announcementsReducer from '../features/announcements/store/announcements.slice';
import batchesReducer from '../features/batches/store/batches.slice';
import activityLogsReducer from '../features/activityLogs/store/activityLogs.slice';
import { resultsReducer, reportsReducer } from '../features/reports/store/reports.slice';
import settingsReducer from '../features/settings/store/settings.slice';
import studyReducer from '../features/study/store/study.slice';
import examCategoriesReducer from '../features/exam-categories/store/examCategories.slice';
import adminExamsReducer from '../features/exams/store/exams.slice';
import adminSubjectsReducer from '../features/subjects/store/subjects.slice';
import topicsReducer from '../features/topics/store/topics.slice';
import adminPlansReducer from '../features/plans/store/plans.slice';
import accessRulesReducer from '../features/access-rules/store/accessRules.slice';
import reviewsReducer from '../features/reviews/store/reviews.slice';
import leaderboardReducer from '../features/leaderboard/store/leaderboard.slice';
import bookmarksReducer from '../features/bookmarks/store/bookmarks.slice';
import homeContentReducer from '../features/home/store/home.slice';
import { enrollmentsReducer } from '../features/enrollments/store';
import { materialPurchasesReducer } from '../features/material-purchases/store';

export const adminStore = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    users: usersReducer,
    tests: testsReducer,
    payments: paymentsReducer,
    analytics: analyticsReducer,
    questions: questionsReducer,
    coupons: couponsReducer,
    notifications: notificationsReducer,
    tickets: ticketsReducer,
    banners: bannersReducer,
    faq: faqReducer,
    announcements: announcementsReducer,
    batches: batchesReducer,
    activityLogs: activityLogsReducer,
    results: resultsReducer,
    reports: reportsReducer,
    settings: settingsReducer,
    study: studyReducer,
    examCategories: examCategoriesReducer,
    adminExams: adminExamsReducer,
    adminSubjects: adminSubjectsReducer,
    topics: topicsReducer,
    adminPlans: adminPlansReducer,
    accessRules: accessRulesReducer,
    reviews: reviewsReducer,
    leaderboard: leaderboardReducer,
    bookmarks: bookmarksReducer,
    homeContent: homeContentReducer,
    enrollments: enrollmentsReducer,
    materialPurchases: materialPurchasesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/loginUser/fulfilled', 'auth/logoutAdmin'],
        ignoredPaths: ['auth.user'],
      },
    }),
});

export type AdminRootState = ReturnType<typeof adminStore.getState>;
export type AdminAppDispatch = typeof adminStore.dispatch;
