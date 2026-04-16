import { useState } from 'react';
import { DragDropProvider, type DragOverEvent } from '@dnd-kit/react';
import { APPLICATION_STAGES } from '../../constants/application.constants';
import { getVisibleStages, sortByNumberKey } from '../../utils';
import { ApplicationStageColumn } from './ApplicationStageColumn';
import type { ApplicationItem } from '../../types/application.types';
import { useApplicationItemDrag } from '../../hooks/useApplicationItemDrag';

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
      job_title: 'Mid Front End Developer',
      company_name: 'VIPTutors Co',
      job_platform: 'Indeed',
      date_applied: 'Mar 3, 2026',
      status: 'applied',
      order_index: 1,
    },
    {
      id: '9101',
      job_title: 'Front End Developer',
      company_name: 'Tech Co',
      job_platform: 'JobStreet',
      date_applied: 'Mar 3, 2026',
      status: 'applied',
      order_index: 0,
    },
  ]);
  const { handleApplicationDragEnd } = useApplicationItemDrag(setApplications);

  return (
    <section className="flex flex-col gap-6 px-8 lg:flex-row">
      <DragDropProvider
        onDragOver={(event: DragOverEvent) => {
          event.preventDefault();
        }}
        onDragEnd={handleApplicationDragEnd}
      >
        {visibleStages.map((stage) => (
          <ApplicationStageColumn
            key={stage.value}
            id={stage.value}
            stage={stage}
            applications={applications
              .filter((item) => item.status === stage.value)
              .sort(sortByNumberKey('order_index'))}
          />
        ))}
      </DragDropProvider>
    </section>
  );
};

export default JobApplicationBoardView;
