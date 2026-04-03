type InterviewItemProps = {
  title: string;
  date: string;
  time: string;
};

const InterviewItem = ({ title, date, time }: InterviewItemProps) => (
  <div className="w-full rounded-lg bg-white px-4 py-2">
    <p className="font-semibold text-purple-700">{title}</p>
    <p className="text-gray-700">{`${date} - ${time}`}</p>
  </div>
);

export default InterviewItem;
