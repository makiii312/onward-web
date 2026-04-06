import { createBrowserRouter, Navigate } from 'react-router';

import AuthLayout from '@/pages/Auth/AuthLayout.tsx';
import DashboardLayout from '@/pages/Dashboard/DashboardLayout.tsx';
import MainDashboardLayout from '@/pages/Dashboard/MainDashboardLayout.tsx';

import LoginPage from '@/pages/Auth/Login.tsx';
import RegistrationPage from '@/pages/Auth/Registration.tsx';
import DashboardPage from '@/pages/Dashboard/index.tsx';
import JobApplicationsPage from '@/pages/Dashboard/JobApplications.tsx';
import LearningPlansPage from '@/pages/Dashboard/LearningPlans.tsx';
import SchedulePage from '@/pages/Dashboard/Schedule.tsx';
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
