import clsx from 'clsx';
import { Bell, CircleUserRound } from 'lucide-react';

type MainHeaderProps = {
  background?: string;
};

const MainHeader = ({ background = 'bg-purple-50' }: MainHeaderProps) => {
  return (
    <header
      className={clsx(
        'h-12.5 flex text-lavender-200 items-center justify-end p-5 gap-5 z-0',
        background,
      )}
    >
      <div>
        <Bell />
      </div>
      <div className="flex gap-2">
        <CircleUserRound />
        <span>Hi, Micah</span>
      </div>
    </header>
  );
};

export default MainHeader;
