import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/ui/collapsible';
import { TableCell, TableRow } from '@/shared/components/ui/table';
import { JOB_APPLICATION_LIST_COLUMNS } from '../../constants/application.constants';
import { Button } from '@/shared/components/ui/button';
import { Calendar, ChevronRightIcon, Globe, Plus } from 'lucide-react';

type StageRowProps = {
  status: { label: string };
};

export const ApplicationStageRow = ({ status }: StageRowProps) => {
  return (
    <>
      {/* Trigger Row */}
      <CollapsibleTrigger asChild>
        <TableRow className="group cursor-pointer">
          <TableCell colSpan={JOB_APPLICATION_LIST_COLUMNS.length}>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-xl font-semibold text-gray-700 transition-none hover:bg-accent hover:text-accent-foreground"
            >
              <ChevronRightIcon className="transition-transform group-data-[state=open]:rotate-90" />
              {status.label}
            </Button>
          </TableCell>
        </TableRow>
      </CollapsibleTrigger>

      {/* Expandable Content Row */}
      <CollapsibleContent asChild>
        {/* Job Application Item Data */}
        <TableRow>
          <TableCell className="border p-4 font-semibold text-gray-700">
            Job Title
          </TableCell>
          <TableCell className="border p-4 text-gray-700">
            Company Name
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
              <span>Job Platform</span>
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
              <span>Date Applied</span>
            </div>
          </TableCell>
        </TableRow>
      </CollapsibleContent>

      <CollapsibleContent asChild>
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
      </CollapsibleContent>
    </>
  );
};
