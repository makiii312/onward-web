import { useState } from 'react';
import { DragDropProvider, type DragOverEvent } from '@dnd-kit/react';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import {
  APPLICATION_STAGES,
  JOB_APPLICATION_LIST_COLUMNS,
} from '../../constants/application.constants';
import { ApplicationListContent } from './ApplicationListContent';
import type { ApplicationItem } from '../../types/application.types';
import { getVisibleStages, sortByNumberKey } from '../../utils';
import { useApplicationItemDrag } from '../../hooks/useApplicationItemDrag';

const JobApplicationListView = () => {
  const visibleStages = getVisibleStages({
    stages: APPLICATION_STAGES, // @TODO: replace with custom application stages of user from API
    selectedStages: [],
  });

  // @TODO: replace with applications of user from API
  const [applications, setApplications] = useState<ApplicationItem[]>([
    {
      id: '1234',
      job_title: 'Software Engineer',
      company_name: 'ProSource',
      job_platform: 'LinkedIn',
      date_applied: null,
      status: 'saved',
      order_index: 0,
    },
    {
      id: '5678',
      job_title: 'Mid Front End Develper',
      company_name: 'VIPTutors Co',
      job_platform: 'Indeed',
      date_applied: 'Mar 3, 2026',
      status: 'applied',
      order_index: 1,
    },
    {
      id: '9101',
      job_title: 'Front End Develper',
      company_name: 'Tech Co',
      job_platform: 'JobStreet',
      date_applied: 'Mar 3, 2026',
      status: 'applied',
      order_index: 0,
    },
  ]);

  const { handleApplicationDragEnd } = useApplicationItemDrag(setApplications);

  const [openStages, setOpenStages] = useState<Record<string, boolean>>({});

  const toggleStage = (stageId: string) => {
    setOpenStages((prev) => ({
      ...prev,
      [stageId]: !prev[stageId],
    }));
  };

  return (
    <DragDropProvider
      onDragOver={(event: DragOverEvent) => {
        event.preventDefault();
      }}
      onDragEnd={handleApplicationDragEnd}
    >
      <Table className="w-full table-fixed">
        {/* List Header */}
        <TableHeader>
          <TableRow>
            {JOB_APPLICATION_LIST_COLUMNS.map((columnHeader) => {
              return (
                <TableHead
                  key={columnHeader.label}
                  className={columnHeader.class}
                >
                  {columnHeader.label}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* Collapsible Job Application Status List */}
          {visibleStages.map((stage) => (
            <ApplicationListContent
              key={stage.value}
              id={stage.value}
              stage={stage}
              isOpen={!!openStages[stage.value]}
              onToggle={() => toggleStage(stage.value)}
              applications={applications
                .filter((item) => item.status === stage.value)
                .sort(sortByNumberKey('order_index'))}
            />
          ))}
        </TableBody>
      </Table>
    </DragDropProvider>
  );
};

export default JobApplicationListView;
