import { useState } from 'react';
import { Link } from 'react-router';
import { Badge } from '@/shared/components/ui/badge';

import DashboardSection from '@/features/dashboard/components/DashboardSection';
import EmptyState from '@/shared/components/EmptyState';
import InterviewItem from '@/features/dashboard/components/InterviewItem';
import JobApplicationStatsOverview from '@/features/dashboard/components/job-applications/JobApplicationStatsOverview';

type InterviewData = {
  title: string;
  date: string;
  time: string;
};

const DashboardPage = () => {
  const [totalApplications] = useState(0);
  const [totalInterviews] = useState(0);
  const [totalActiveApplications] = useState(0);
  const [upcomingInterviews] = useState([]);

  return (
    <>
      {/* Overall Job Application Stats */}
      <JobApplicationStatsOverview
        totalApplications={totalApplications}
        totalInterviews={totalInterviews}
        interviewRate=""
        offerRate=""
      />

      <div className="relative flex flex-col-reverse gap-10 md:flex-row">
        <div className="flex w-full flex-col gap-y-16 md:w-3/4">
          {/* Active Job Applications */}
          <DashboardSection
            title="Active Job Applications"
            titleExtra={
              totalActiveApplications > 0 && (
                <Badge className="bg-lavender-200 text-purple-700">
                  {totalActiveApplications}
                </Badge>
              )
            }
          >
            <EmptyState message="No Active Job Applications" />
          </DashboardSection>

          {/* Learning Plans */}
          <DashboardSection title="Learning Plans">
            <EmptyState message="No Learning Plans" />
          </DashboardSection>
        </div>

        {/* Upcoming Interviews */}
        <section className="flex w-full flex-col gap-y-2 md:w-1/4">
          <div className="flex justify-between text-sm">
            <h3 className="font-semibold">Upcoming Interviews</h3>
            <Link className="text-gray-500" to="/schedule">
              View All
            </Link>
          </div>
          <div className="flex min-h-16 flex-col items-center justify-center gap-y-4 rounded-lg border border-dashed border-gray-500 p-4">
            {upcomingInterviews.length === 0 ? (
              <p className="text-center text-gray-500">No data available</p>
            ) : (
              upcomingInterviews.map(
                (interviewData: InterviewData, index: number) => (
                  <InterviewItem
                    key={index}
                    title={interviewData.title}
                    date={interviewData.date}
                    time={interviewData.time}
                  />
                ),
              )
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default DashboardPage;
