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
          'flex items-center gap-3 p-5 hover:text-purple-900 transition-all duration-300',
          {
            'justify-center': collapsed,
          },
        )}
      >
        <Icon />

        <span
          className={clsx('whitespace-nowrap transition-all duration-300', {
            'opacity-0 w-0 overflow-hidden': collapsed,
            'opacity-100 w-auto': !collapsed,
          })}
        >
          {label}
        </span>
      </Link>
    </li>
  );
};

export default NavItem;
