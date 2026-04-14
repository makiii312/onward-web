import clsx from 'clsx';
import { NavLink } from 'react-router';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

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
      <Tooltip>
        <TooltipTrigger className="w-full transition-all duration-300" asChild>
          <span className="flex w-full">
            <NavLink
              to={to}
              className={({ isActive }) => {
                return clsx(
                  'flex w-full items-center place-self-center p-5 transition-all duration-300 hover:text-purple-900',
                  {
                    'gap-3': !collapsed,
                    'justify-center': collapsed,
                    'text-purple-900': isActive,
                  },
                );
              }}
            >
              <Icon />

              <span
                className={clsx(
                  'whitespace-nowrap transition-all duration-300',
                  {
                    'w-0 overflow-hidden opacity-0': collapsed,
                    'w-auto opacity-100': !collapsed,
                  },
                )}
              >
                {label}
              </span>
            </NavLink>
          </span>
        </TooltipTrigger>
        <TooltipContent
          className={clsx('', {
            'w-auto overflow-hidden opacity-100': collapsed,
            'w-0 opacity-0': !collapsed,
          })}
          side="right"
          sideOffset={-20}
        >
          {label}
        </TooltipContent>
      </Tooltip>
    </li>
  );
};

export default NavItem;
