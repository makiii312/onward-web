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
import { JobApplicationView } from './JobApplicationView';
import type { ApplicationItem } from '../../types/application.types';
import { useState } from 'react';

type ApplicationCardDropdownProps = {
  applicationId?: string;
  applicationData?: ApplicationItem;
  onDelete?: (applicationId: string | undefined) => void;
};

export const ApplicationCardDropdown = ({
  applicationId,
  applicationData,
  onDelete,
}: ApplicationCardDropdownProps) => {
  const [sheetState, setSheetState] = useState<{
    open: boolean;
    mode: 'view' | 'edit';
  }>({
    open: false,
    mode: 'view',
  });

  const handleViewJobPosting = () => {
    // Implement logic to view job posting, e.g., navigate to job posting page
    console.log('View job posting for application ID:', applicationId);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="absolute -top-1 -right-3 text-gray-500 hover:bg-transparent hover:text-gray-700 focus:bg-transparent"
            variant="ghost"
            size="icon-sm"
          >
            <EllipsisVertical className="" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="start">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onSelect={() => {
                setSheetState({ open: true, mode: 'view' });
              }}
            >
              View details
            </DropdownMenuItem>

            <DropdownMenuItem
              onSelect={() => {
                setSheetState({ open: true, mode: 'edit' });
              }}
            >
              Edit details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleViewJobPosting}>
              View job posting
            </DropdownMenuItem>
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

      <JobApplicationView
        applicationId={applicationId}
        initialData={applicationData}
        mode={sheetState.mode}
        open={sheetState.open}
        onOpenChange={(open) => setSheetState((prev) => ({ ...prev, open }))}
        onModeChange={(mode) => setSheetState((prev) => ({ ...prev, mode }))}
        onDelete={() => onDelete?.(applicationId)}
      />
    </>
  );
};
