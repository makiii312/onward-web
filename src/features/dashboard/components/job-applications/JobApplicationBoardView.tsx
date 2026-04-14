import { useState } from 'react';
import {
  DragDropProvider,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';
import { APPLICATION_STAGES } from '../../constants/application.constants';
import { getVisibleStages } from '../../utils/stage.util';
import { ApplicationStageColumn } from './ApplicationStageColumn';
import type { ApplicationItem } from '../../types/application.types';

const JobApplicationBoardView = () => {
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
    <section className="flex flex-col gap-6 px-8 lg:flex-row">
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
        {visibleStages.map((stage) => (
          <ApplicationStageColumn
            key={stage.value}
            id={stage.value}
            stage={stage}
            applications={applications
              .filter((item) => item.status === stage.value)
              .sort(
                (firstItem, secondItem) =>
                  firstItem.order_index - secondItem.order_index,
              )}
          />
        ))}
      </DragDropProvider>
    </section>
  );
};

export default JobApplicationBoardView;
