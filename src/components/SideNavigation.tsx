import { Link } from 'react-router';
import {
  DashboardIcon,
  ClipboardListIcon,
  AcademicCapIcon,
  CalendarIcon,
} from '../components/Icons.tsx';

const SideNavigation = () => {
  return (
    <aside className="fixed w-[15%] min-h-full bg-white">
      <div className="flex items-center p-5 border-b border-grey-50">
        <img
          className="w-37.5"
          src="/src/assets/onward-logo.svg"
          alt="Onward Logo"
        />
      </div>

      <nav className="text-grey-500">
        <ul>
          <li>
            <Link className="flex gap-2 p-5 hover:text-purple-900" to="/">
              <DashboardIcon />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-2 p-5 hover:text-purple-900"
              to="/job-applications"
            >
              <ClipboardListIcon />
              <span>Job Applications</span>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-2 p-5 hover:text-purple-900"
              to="/learning-plans"
            >
              <AcademicCapIcon />
              <span>Learning Plans</span>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-2 p-5 hover:text-purple-900"
              to="/schedule"
            >
              <CalendarIcon />
              <span>Schedule</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideNavigation;
