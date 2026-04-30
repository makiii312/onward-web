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

type ApplicationCardDropdownProps = {
  applicationId?: string;
  applicationData?: ApplicationItem;
  onDelete?: () => void;
};

export const ApplicationCardDropdown = ({
  applicationId,
  applicationData,
  onDelete,
}: ApplicationCardDropdownProps) => {
  const handleViewJobPosting = () => {
    // Implement logic to view job posting, e.g., navigate to job posting page
    console.log('View job posting for application ID:', applicationId);
  };

  return (
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
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            <JobApplicationView
              applicationId={applicationId}
              initialData={applicationData}
            >
              <span>View details</span>
            </JobApplicationView>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            <JobApplicationView
              editable
              applicationId={applicationId}
              initialData={applicationData}
            >
              <span>Edit details</span>
            </JobApplicationView>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleViewJobPosting}>
            View job posting
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" onClick={onDelete}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
