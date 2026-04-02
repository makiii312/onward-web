import { createBrowserRouter, RouterProvider } from 'react-router';

import AuthLayout from './pages/Auth/AuthLayout.tsx';
import DashboardLayout from './pages/Dashboard/DashboardLayout.tsx';
import MainDashboardLayout from './pages/Dashboard/MainDashboardLayout.tsx';

import LoginPage from './pages/Auth/Login.tsx';
import RegistrationPage from './pages/Auth/Registration.tsx';
import DashboardPage from './pages/Dashboard/index.tsx';
import JobApplicationsPage from './pages/Dashboard/JobApplications.tsx';
import LearningPlansPage from './pages/Dashboard/LearningPlans.tsx';
import SchedulePage from './pages/Dashboard/Schedule.tsx';
import { SidebarProvider } from './context/sidebar/SidebarProvider.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainDashboardLayout,
    children: [{ index: true, Component: DashboardPage }],
  },
  {
    path: '/',
    Component: DashboardLayout,
    children: [
      { path: 'job-applications', Component: JobApplicationsPage },
      { path: 'learning-plans', Component: LearningPlansPage },
      { path: 'schedule', Component: SchedulePage },
    ],
  },
  {
    path: '/auth',
    Component: AuthLayout,
    children: [
      { path: 'login', Component: LoginPage },
      { path: 'register', Component: RegistrationPage },
    ],
  },
]);

const App = () => {
  return (
    <SidebarProvider>
      <RouterProvider router={router} />
    </SidebarProvider>
  );
};

export default App;
