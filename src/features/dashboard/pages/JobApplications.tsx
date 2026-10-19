import { useState } from 'react';
import { Separator } from '@/shared/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs';

import JobApplicationStatsOverview from '../components/job-applications/JobApplicationStatsOverview';
import JobApplicationListView from '../components/job-applications/JobApplicationListView';
import JobApplicationBoardView from '../components/job-applications/JobApplicationBoardView';
import JobApplicationSettings from '../components/job-applications/JobApplicationSettings';

const JobApplicationsPage = () => {
  const [totalApplications] = useState(0);
  const [totalInterviews] = useState(0);

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col gap-8">
        <div className="px-8 pt-10">
          <h1 className="text-2xl font-bold text-purple-700">
            Job Applications
          </h1>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="px-8" variant="line">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
            <TabsTrigger value="board">Board</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <Separator />

          <div className="flex flex-col gap-8 pt-6">
            <TabsContent value="overview" className="px-8">
              <JobApplicationStatsOverview
                totalApplications={totalApplications}
                totalInterviews={totalInterviews}
                interviewRate=""
                offerRate=""
              />
            </TabsContent>

            <TabsContent value="list">
              <JobApplicationListView />
            </TabsContent>

            <TabsContent value="board">
              <JobApplicationBoardView />
            </TabsContent>

            <TabsContent value="settings">
              <JobApplicationSettings />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default JobApplicationsPage;
