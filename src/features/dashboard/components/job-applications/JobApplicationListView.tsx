import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { getVisibleStages } from '../../utils/stage.util';
import {
  APPLICATION_STAGES,
  JOB_APPLICATION_LIST_COLUMNS,
} from '../../constants/application.constants';
import { ApplicationStageListContent } from './ApplicationStageListContent';
import { useState } from 'react';
import type { ApplicationItem } from '../../types/application.types';
import {
  DragDropProvider,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';

const JobApplicationListView = () => {
  const [openStages, setOpenStages] = useState<Record<string, boolean>>({});

  const toggleStage = (stageId: string) => {
    setOpenStages((prev) => ({
      ...prev,
      [stageId]: !prev[stageId],
    }));
  };

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

  return (
    <DragDropProvider
      onDragOver={(event: DragOverEvent) => {
        event.preventDefault();
      }}
      onDragEnd={(event: DragEndEvent) => {
        console.log('onDragEnd event', event);
        if (event.canceled) return;

        const { source, target } = event.operation;

        if (!source || !target) return;

        setApplications((prevApplications) => {
          const updatedApplications = structuredClone(prevApplications);

          const applicationSourceId = source?.id;
          const applicationTargetStage = (target?.group ??
            target?.id) as string;

          const draggedItem = updatedApplications.find(
            (application) => application.id === applicationSourceId,
          );
          const applicationSourceStage = draggedItem?.status;

          if (!draggedItem) return prevApplications;

          // Handle application item moving to different application stage column
          if (applicationSourceStage !== applicationTargetStage) {
            draggedItem.status = applicationTargetStage;
          }

          // Handler re-order of application items within same application stage column
          if (isSortable(source) && isSortable(target)) {
            const { index: initialIndex } = source.sortable;
            const { index: updatedIndex } = target.sortable;

            const sameColumnItems = updatedApplications
              .filter((item) => item.status === applicationSourceStage)
              .sort(
                (firstItem, secondItem) =>
                  firstItem.order_index - secondItem.order_index,
              );
            const movingItem = sameColumnItems[initialIndex];
            sameColumnItems.splice(initialIndex, 1);
            sameColumnItems.splice(updatedIndex, 0, movingItem);

            sameColumnItems.forEach((item, index) => {
              const original = updatedApplications.find((i) => {
                return i?.id === item?.id;
              });
              if (original) original.order_index = index;
            });
          }

          return [...updatedApplications];
        });
      }}
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
            <ApplicationStageListContent
              key={stage.value}
              id={stage.value}
              stage={stage}
              isOpen={!!openStages[stage.value]}
              onToggle={() => toggleStage(stage.value)}
              applications={applications
                .filter((item) => item.status === stage.value)
                .sort(
                  (firstItem, secondItem) =>
                    firstItem.order_index - secondItem.order_index,
                )}
            />
          ))}
        </TableBody>
      </Table>
    </DragDropProvider>
  );
};

export default JobApplicationListView;
