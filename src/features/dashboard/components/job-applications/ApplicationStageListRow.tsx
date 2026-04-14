import { Calendar, Globe } from 'lucide-react';
import { TableCell, TableRow } from '@/shared/components/ui/table';
import { Button } from '@/shared/components/ui/button';
import type { ApplicationItem } from '../../types/application.types';
import { useSortable } from '@dnd-kit/react/sortable';

type StageRowProps = {
  application: ApplicationItem;
};

export const ApplicationStageListRow = ({ application }: StageRowProps) => {
  const { ref } = useSortable({
    id: application.id,
    index: application.order_index,
    group: application.status,
    type: 'application',
    accept: ['application'],
  });

  return (
    <TableRow ref={ref} className="cursor-pointer bg-gray-50">
      <TableCell className="border p-4 font-semibold text-gray-700">
        {application.job_title}
      </TableCell>
      <TableCell className="border p-4 text-gray-700">
        {application.company_name}
      </TableCell>

      <TableCell className="border p-4 text-gray-700">
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            aria-label="Web"
            variant="outline"
            className="rounded-2xl border-3 border-dashed text-gray-500"
          >
            <Globe />
          </Button>
          <span>{application.job_platform}</span>
        </div>
      </TableCell>
      <TableCell className="border p-4 text-gray-700">
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            aria-label="Calendar"
            variant="outline"
            className="rounded-2xl border-3 border-dashed text-gray-500"
          >
            <Calendar />
          </Button>
          <span>{application?.date_applied}</span>
        </div>
      </TableCell>
    </TableRow>
  );
};
