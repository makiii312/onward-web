import StatsCard from '../StatsCard';

type StatsData = {
  totalApplications: number | string;
  totalInterviews: number | string;
  interviewRate: string;
  offerRate: string;
};

const JobApplicationStatsOverview = ({
  totalApplications = 0,
  totalInterviews = 0,
  interviewRate = '',
  offerRate = '',
}: StatsData) => {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Applications Submitted"
        value={totalApplications}
        percentage=""
      />
      <StatsCard
        title="Number of Interviews"
        value={totalInterviews}
        percentage=""
      />
      <StatsCard
        title="Interview Rate"
        value={interviewRate}
        percentage=""
        defaultValue="-"
      />
      <StatsCard
        title="Offer Rate"
        value={offerRate}
        percentage=""
        defaultValue="-"
      />
    </section>
  );
};

export default JobApplicationStatsOverview;
