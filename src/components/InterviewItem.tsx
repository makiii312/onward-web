type InterviewItemProps = {
  title: string;
  date: string;
  time: string;
};

const InterviewItem = ({ title, date, time }: InterviewItemProps) => (
  <div className="w-full bg-white px-4 py-2 rounded-lg">
    <p className="text-purple-700 font-semibold">{title}</p>
    <p className="text-grey-700">{`${date} - ${time}`}</p>
  </div>
);

export default InterviewItem;
