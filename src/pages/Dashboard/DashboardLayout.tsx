import { Outlet } from 'react-router';
import clsx from 'clsx';
import MainHeader from '@/components/navigation/MainHeader';
import SideNavigation from '@/components/navigation/SideNavigation';
import { useSidebar } from '@/context/sidebar/useSidebar';

const DashboardLayout = () => {
  const { collapsed } = useSidebar();

  return (
    <div className="min-h-screen">
      <SideNavigation />

      <section
        className={clsx(
          'relative min-h-full transition-all duration-300',
          collapsed
            ? 'ml-20 w-[calc(100%-80px)]'
            : 'ml-60 w-[calc(100%-240px)]',
        )}
      >
        <MainHeader />
        <main className="flex flex-col gap-y-16">
          <Outlet />
        </main>
      </section>
    </div>
  );
};

export default DashboardLayout;
