import { BellIcon, UserCircleIcon } from '../components/Icons.tsx';

const MainNavigation = () => {
  return (
    <header className="h-12.5 flex bg-purple-50 text-lavender-200 items-center justify-end p-5 gap-5">
      <div>
        <BellIcon />
      </div>
      <div className="flex gap-2">
        <UserCircleIcon />
        <span>Hi, Micah</span>
      </div>
    </header>
  );
};

export default MainNavigation;
