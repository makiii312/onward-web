import { createBrowserRouter, Navigate } from 'react-router';

import AuthLayout from '@/features/auth/components/AuthLayout';
import DashboardLayout from '@/features/dashboard/components/DashboardLayout';
import MainDashboardLayout from '@/features/dashboard/components/MainDashboardLayout';

import LoginPage from '@/features/auth/pages/Login';
import RegistrationPage from '@/features/auth/pages/Registration';
import DashboardPage from '@/features/dashboard/pages/Dashboard';
import JobApplicationsPage from '@/features/dashboard/pages/JobApplications';
import LearningPlansPage from '@/features/dashboard/pages/LearningPlans';
import SchedulePage from '@/features/dashboard/pages/Schedule';
import { authMiddleware, publicRouteMiddleware } from '@/config/middleware.ts';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainDashboardLayout,
    middleware: [authMiddleware],
    children: [{ index: true, Component: DashboardPage }],
  },
  {
    path: '/',
    Component: DashboardLayout,
    middleware: [authMiddleware],
    children: [
      { path: 'job-applications', Component: JobApplicationsPage },
      { path: 'learning-plans', Component: LearningPlansPage },
      { path: 'schedule', Component: SchedulePage },
    ],
  },
  {
    path: '/auth',
    Component: AuthLayout,
    middleware: [publicRouteMiddleware],
    children: [
      { index: true, element: <Navigate to="login" replace /> },
      { path: 'login', Component: LoginPage },
      { path: 'register', Component: RegistrationPage },
    ],
  },
]);
