import clsx from 'clsx';
import { Bell, CircleUserRound } from 'lucide-react';

type MainHeaderProps = {
  background?: string;
};

const MainHeader = ({ background = 'bg-purple-50' }: MainHeaderProps) => {
  return (
    <header
      className={clsx(
        'z-0 flex h-12.5 items-center justify-end gap-5 p-5 text-lavender-200',
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
