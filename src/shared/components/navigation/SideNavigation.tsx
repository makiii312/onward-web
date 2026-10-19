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
        'fixed z-10 min-h-full bg-white transition-all duration-300',
        {
          'w-20': collapsed,
          'w-60': !collapsed,
        },
      )}
    >
      <div className="flex items-center border-b border-gray-50 p-5">
        {/* Main Logo */}
        <div className="flex items-center gap-4 text-3xl font-bold text-purple-500">
          <img
            src="/src/assets/onward-logo.svg"
            alt="Onward"
            className={clsx(
              'w-9 transition-all duration-300',
              collapsed ? 'mx-auto' : '',
            )}
          />
          {!collapsed && (
            <span className="transition-all duration-300">onward</span>
          )}
        </div>

        {/* Toggle Button */}
        <button
          aria-label="Collapse sidebar"
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-10 -right-4 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-lavender-200 shadow"
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
