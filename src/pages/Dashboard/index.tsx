import { useState } from 'react';
import { Link } from 'react-router';
import Badge from '../../components/Badge';
import DashboardSection from '../../components/DashboardSection';
import EmptyState from '../../components/EmptyState';
import InterviewItem from '../../components/InterviewItem';
import StatsCard from '../../components/card/StatsCard';

type InterviewData = {
  title: string;
  date: string;
  time: string;
};

const DashboardPage = () => {
  const [totalApplications] = useState(0);
  const [totalActiveApplications] = useState(0);
  const [upcomingInterviews] = useState([]);

  return (
    <>
      {/* Overall Job Application Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatsCard
          title="Total Applications Submitted"
          value={totalApplications}
          percentage=""
        />
        <StatsCard title="Number of Interviews" value="" percentage="" />
        <StatsCard
          title="Interview Rate"
          value=""
          percentage=""
          defaultValue="-"
        />
        <StatsCard title="Offer Rate" value="" percentage="" defaultValue="-" />
      </section>

      <div className="relative flex flex-col-reverse md:flex-row gap-10">
        <div className="w-full md:w-3/4 flex flex-col gap-y-16">
          {/* Active Job APplications */}
          <DashboardSection
            title="Active Job Applications"
            titleExtra={
              totalActiveApplications > 0 && (
                <Badge variant="primary">{totalActiveApplications}</Badge>
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
        <section className="w-full md:w-1/4 flex flex-col gap-y-2">
          <div className="flex justify-between text-sm">
            <h3 className="font-semibold">Upcoming Interviews</h3>
            <Link className="text-grey-500" to="/schedule">
              View All
            </Link>
          </div>
          <div className="flex flex-col min-h-16 border border-dashed border-grey-500 rounded-lg items-center justify-center p-4 gap-y-4">
            {upcomingInterviews.length === 0 ? (
              <p className="text-center text-grey-500">No data available</p>
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
