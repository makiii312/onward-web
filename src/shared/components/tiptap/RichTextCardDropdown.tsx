import { EllipsisVertical } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

type RichTextCardDropdownProps = {
  applicationId?: string;
  onEdit?: () => void;
  onDelete?: (applicationId: string | undefined) => void;
};

export const RichTextCardDropdown = ({
  applicationId,
  onEdit,
  onDelete,
}: RichTextCardDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="absolute -top-1 right-2 text-gray-500 hover:bg-transparent hover:text-gray-700 focus:bg-transparent"
          variant="ghost"
          size="icon-sm"
        >
          <EllipsisVertical className="" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => onEdit?.()}>Edit</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => onDelete?.(applicationId)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
