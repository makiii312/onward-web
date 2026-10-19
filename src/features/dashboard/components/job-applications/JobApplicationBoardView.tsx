import { useState } from 'react';
import { DragDropProvider, type DragOverEvent } from '@dnd-kit/react';
import { APPLICATION_STAGES } from '../../constants/application.constants';
import { getVisibleStages, sortByNumberKey } from '../../utils';
import { ApplicationStageColumn } from './ApplicationStageColumn';
import type { ApplicationItem } from '../../types/application.types';
import { useApplicationItemDrag } from '../../hooks/useApplicationItemDrag';
import { formatUnixTimestamp } from '@/shared/lib/dateUtils';

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
      job_platform: 'linkedin',
      date_applied: null,
      status: 'saved',
      order_index: 0,
    },
    {
      id: '5678',
      job_title: 'Mid Front End Developer',
      company_name: 'VIPTutors Co',
      job_platform: 'indeed',
      date_applied: 'Mar 3, 2026',
      status: 'applied',
      order_index: 1,
    },
    {
      id: '9101',
      job_title: 'Front End Developer',
      company_name: 'Tech Co',
      job_platform: 'jobstreet',
      date_applied: 'Mar 3, 2026',
      status: 'applied',
      order_index: 0,
    },
  ]);
  const { handleApplicationDragEnd } = useApplicationItemDrag(setApplications);

  /**
   * Adds a new application with default values to the specified target stage, and sets it to editable mode for user to input details.
   * The new application will be deleted if user clicks outside the card without entering a job title or presses Enter key without entering a job title.
   */
  const addNewApplication = (targetStage: string) => {
    setApplications([
      ...applications,
      {
        id: `temp-${formatUnixTimestamp(new Date())}`,
        job_title: '',
        company_name: '',
        job_platform: '',
        date_applied: null,
        status: targetStage,
        order_index: applications.length,
        is_new: true,
      },
    ]);
  };

  /**
   * Deletes a new application from the list.
   * @param applicationId
   */
  const deleteNewApplication = (applicationId: string) => {
    setApplications((prev) =>
      prev.filter((application) => application.id !== applicationId),
    );
  };

  /**
   * Updates a new application with details when user edits the application card,
   * and finalizes changes for new application when user clicks outside the card or presses Enter key.
   * The finalized new application will be created in backend via Create Job Application API.
   * @param applicationId
   * @param updates
   */
  const updateNewApplication = (
    applicationId: string,
    updates: Partial<ApplicationItem>,
  ) => {
    setApplications((prev) =>
      prev.map((application) =>
        application.id === applicationId
          ? { ...application, ...updates }
          : application,
      ),
    );
    // @TODO: Integrate with API to create new application in backend and replace temp id with real id from backend
  };

  /**
   * Deletes an existing application from the list.
   * @param applicationId
   */
  const deleteExistingApplication = (applicationId: string) => {
    setApplications((prev) =>
      prev.filter((application) => application.id !== applicationId),
    );
    // @TODO: Integrate with API to delete application in backend
  };

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
            onNewApplicationUpdated={updateNewApplication}
            onNewApplicationAdded={() => addNewApplication(stage.value)}
            onNewApplicationDeleted={(applicationId) =>
              deleteNewApplication(applicationId)
            }
            onExistingApplicationDeleted={(applicationId) =>
              deleteExistingApplication(applicationId)
            }
          />
        ))}
      </DragDropProvider>
    </section>
  );
};

export default JobApplicationBoardView;
