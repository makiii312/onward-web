import JobApplicationStatsOverview from '@/components/JobApplicationStatsOverview';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

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

          <div className="flex flex-col gap-8 p-10">
            <TabsContent value="overview">
              <JobApplicationStatsOverview
                totalApplications={totalApplications}
                totalInterviews={totalInterviews}
                interviewRate=""
                offerRate=""
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default JobApplicationsPage;
