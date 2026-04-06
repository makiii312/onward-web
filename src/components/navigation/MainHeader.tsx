import clsx from 'clsx';
import { Bell } from 'lucide-react';
import DropdownMenuAvatar from './DropdownMenuAvatar';

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
        <DropdownMenuAvatar></DropdownMenuAvatar>
      </div>
    </header>
  );
};

export default MainHeader;
