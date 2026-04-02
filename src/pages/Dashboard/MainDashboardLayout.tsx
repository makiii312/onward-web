import { Outlet } from 'react-router';
import clsx from 'clsx';
import MainHeader from '@/components/navigation/MainHeader';
import SideNavigation from '@/components/navigation/SideNavigation';
import { useSidebar } from '@/context/sidebar/useSidebar';

const MainDashboardLayout = () => {
  const { collapsed } = useSidebar();

  return (
    <div className="min-h-screen">
      <SideNavigation />

      <div
        className={clsx(
          'transition-all duration-300',
          collapsed ? 'ml-20' : 'ml-60',
        )}
      >
        <div className="h-58.75 bg-linear-to-t from-purple-50 to-blue-300">
          <MainHeader background="bg-transparent" />
        </div>

        <main className="px-6 md:px-12 lg:px-26 -mt-20 flex flex-col gap-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainDashboardLayout;
