import { useState } from 'react';
import { DragDropProvider } from '@dnd-kit/react';
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
    },
    {
      id: '5678',
      job_title: 'Mid Front End Develper',
      company_name: 'VIPTutors Co',
      job_platform: 'Indeed',
      date_applied: 'Mar 3, 2026',
      status: 'applied',
    },
  ]);

  return (
    <section className="flex flex-col gap-6 px-8 lg:flex-row">
      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return;

          const applicationId = event.operation.source?.id;
          const newApplicationStage = event.operation.target?.id as string;

          setApplications(() =>
            applications.map((application) =>
              application.id === applicationId
                ? { ...application, status: newApplicationStage }
                : application,
            ),
          );
        }}
      >
        {visibleStages.map((stage) => (
          <ApplicationStageColumn
            key={stage.value}
            id={stage.value}
            stage={stage}
            applications={applications.filter(
              (item) => item.status === stage.value,
            )}
          />
        ))}
      </DragDropProvider>
    </section>
  );
};

export default JobApplicationBoardView;
