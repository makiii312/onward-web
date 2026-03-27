import { Outlet } from 'react-router';
import MainNavigation from '../../components/MainNavigation';
import SideNavigation from '../../components/SideNavigation';
import './Dashboard.css';

const DashboardLayout = () => {
  return (
    <div>
      <SideNavigation />

      <section className="relative min-h-full w-[85%] ml-[15%]">
        <MainNavigation />
        <Outlet />
      </section>
    </div>
  );
};

export default DashboardLayout;
