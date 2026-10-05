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
import { AddJobApplicationInterview } from '../components/job-applications/AddJobApplicationInterview';
import { FilterJobApplication } from '../components/job-applications/FilterJobApplication';

const JobApplicationsPage = () => {
  const [totalApplications] = useState(0);
  const [totalInterviews] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const DISPLAY_ACTION_BUTTONS = activeTab === 'list' || activeTab === 'board';

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between px-8 pt-10">
        {/* Page Header */}
        <h1 className="text-2xl font-bold text-purple-700">Job Applications</h1>

        {DISPLAY_ACTION_BUTTONS && (
          <div className="flex flex-wrap gap-4">
            <AddJobApplicationInterview />
            <FilterJobApplication />
          </div>
        )}
      </div>

      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={handleTabChange}
      >
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
  );
};

export default JobApplicationsPage;
