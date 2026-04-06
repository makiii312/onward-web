import clsx from 'clsx';
import { Link } from 'react-router';

type NavItemProps = {
  to: string;
  icon: React.ElementType;
  label: string;
  collapsed?: boolean;
};

const NavItem = ({
  to,
  icon: Icon,
  label,
  collapsed = false,
}: NavItemProps) => {
  return (
    <li>
      <Link
        to={to}
        className={clsx(
          'flex items-center gap-3 p-5 transition-all duration-300 hover:text-purple-900',
          {
            'justify-center': collapsed,
          },
        )}
      >
        <Icon />

        <span
          className={clsx('whitespace-nowrap transition-all duration-300', {
            'w-0 overflow-hidden opacity-0': collapsed,
            'w-auto opacity-100': !collapsed,
          })}
        >
          {label}
        </span>
      </Link>
    </li>
  );
};

export default NavItem;
