import { BadgeCheckIcon, LogOutIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ApiErrorHandler } from '@/api/errors';
import { logoutAccount } from '@/api/endpoints/auth.api';
import { useAuth } from '@/hooks/useAuth';
import { getNameInitials } from '@/lib/nameUtils';

const DropdownMenuAvatar = () => {
  const { logout, getUserName } = useAuth();
  const { firstName } = getUserName();
  const firstNameInitials = getNameInitials(firstName as string);

  const handleLogout = async () => {
    try {
      await logoutAccount();
      toast.success('Successfully logged out', { toasterId: 'global' });
      logout();
    } catch (error: unknown) {
      let errorMessage = 'Failed to logout.';

      if (error instanceof ApiErrorHandler) {
        errorMessage = error?.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      console.error('error', errorMessage);
      toast.error(errorMessage, { toasterId: 'global' });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src="https://github.com" alt="@shadcn" />
              <AvatarFallback>{firstNameInitials}</AvatarFallback>
            </Avatar>
          </Button>

          <div className="flex cursor-pointer flex-col">
            <span className="text-sm leading-none font-medium">
              Hi, {firstName}
            </span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheckIcon />
            Account
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuAvatar;
