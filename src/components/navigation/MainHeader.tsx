import clsx from 'clsx';
import { BellIcon, UserCircleIcon } from '../Icons.tsx';

type MainHeaderProps = {
  background?: string;
};

const MainHeader = ({ background = 'bg-purple-50' }: MainHeaderProps) => {
  return (
    <header
      className={clsx(
        'h-12.5 flex text-lavender-200 items-center justify-end p-5 gap-5',
        background,
      )}
    >
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

export default MainHeader;
