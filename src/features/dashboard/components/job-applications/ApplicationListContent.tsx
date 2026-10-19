import { ChevronRightIcon, Plus } from 'lucide-react';
import { TableCell, TableRow } from '@/shared/components/ui/table';
import { Button } from '@/shared/components/ui/button';
import { JOB_APPLICATION_LIST_COLUMNS } from '../../constants/application.constants';
import type {
  ApplicationStage,
  ApplicationItem,
} from '../../types/application.types';
import { ApplicationListRow } from './ApplicationListRow';
import { useDroppable } from '@dnd-kit/react';
import { CollisionPriority } from '@dnd-kit/abstract';

type StageRowProps = {
  id: string;
  stage: ApplicationStage;
  applications?: ApplicationItem[];
  isOpen: boolean;
  onToggle: () => void;
};

export const ApplicationListContent = ({
  id,
  stage,
  applications = [],
  isOpen,
  onToggle,
}: StageRowProps) => {
  const { ref } = useDroppable({
    id,
    type: 'stage',
    accept: ['application'],
    collisionPriority: CollisionPriority.Low,
  });

  return (
    <>
      {/* Trigger Row */}
      <TableRow ref={ref} onClick={onToggle} className="group cursor-pointer">
        <TableCell colSpan={JOB_APPLICATION_LIST_COLUMNS.length}>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-xl font-semibold text-gray-700 transition-none hover:bg-accent hover:text-accent-foreground"
          >
            <ChevronRightIcon
              className={`transition-transform ${isOpen ? 'rotate-90' : ''}`}
            />
            {stage.label}
          </Button>
        </TableCell>
      </TableRow>

      {/* Expandable Content Row */}
      {isOpen && (
        <>
          {/* Job Application Item Data */}
          {applications.map((application) => (
            <ApplicationListRow
              key={application.id}
              application={application}
            />
          ))}
          {/* Add Item Action */}
          <TableRow>
            <TableCell
              colSpan={JOB_APPLICATION_LIST_COLUMNS.length}
              className="p-6"
            >
              <Button variant="secondary" size="lg" className="p-5 text-xs">
                <Plus size={12} />
                Add Item
              </Button>
            </TableCell>
          </TableRow>
        </>
      )}
    </>
  );
};
