import clsx from 'clsx';
import {
  ChevronLeft,
  LayoutDashboard,
  ClipboardList,
  GraduationCap,
  Calendar,
} from 'lucide-react';
import NavItem from './NavItem.tsx';
import { useSidebar } from '@/context/sidebar/useSidebar.tsx';

const SideNavigation = () => {
  const { collapsed, setCollapsed } = useSidebar();

  return (
    <aside
      className={clsx(
        'fixed min-h-full bg-white transition-all duration-300 z-10',
        {
          'w-20': collapsed,
          'w-60': !collapsed,
        },
      )}
    >
      <div className="flex items-center p-5 border-b border-gray-50">
        {/* Main Logo */}
        <img
          src={
            collapsed
              ? '/src/assets/onward-logo.svg'
              : '/src/assets/onward-logo-text.svg'
          }
          alt="Onward"
          className={clsx(
            'transition-all duration-300',
            collapsed ? 'w-9 mx-auto' : 'w-37.5',
          )}
        />

        {/* Toggle Button */}
        <button
          aria-label="Collapse sidebar"
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-4 top-10 -translate-y-1/2 
          bg-lavender-200 shadow rounded-full w-8 h-8 flex items-center justify-center"
        >
          <span
            className={clsx(
              'text-purple-500 transition-transform duration-300',
              collapsed ? 'rotate-180' : '',
            )}
          >
            <ChevronLeft size={16} />
          </span>
        </button>
      </div>

      <nav className="text-gray-500">
        {/* Side Nav Links */}
        <ul>
          <NavItem
            to="/"
            icon={LayoutDashboard}
            label="Dashboard"
            collapsed={collapsed}
          />
          <NavItem
            to="/job-applications"
            icon={ClipboardList}
            label="Job Applications"
            collapsed={collapsed}
          />
          <NavItem
            to="/learning-plans"
            icon={GraduationCap}
            label="Learning Plans"
            collapsed={collapsed}
          />
          <NavItem
            to="/schedule"
            icon={Calendar}
            label="Schedule"
            collapsed={collapsed}
          />
        </ul>
      </nav>
    </aside>
  );
};

export default SideNavigation;
