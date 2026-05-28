import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import { Loader } from '@shared/components';
import { adminRoutes } from './admin/routes/AdminRoutes';
import './index.css';

const router = createBrowserRouter([
  ...adminRoutes,
  { path: '*', element: <Navigate to="/admin/login" replace /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Loader size="lg" label="Loading..." />
      </div>
    }>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
