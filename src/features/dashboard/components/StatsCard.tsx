type StatsCardProps = {
  title: string;
  value: string | number;
  percentage: string;
  defaultValue?: string;
};

const StatsCard = ({
  title,
  value = '',
  percentage = '',
  defaultValue = '0',
}: StatsCardProps) => {
  const hasStatChanges = !!percentage && percentage !== '0%';
  const statPercentageDiffValue = hasStatChanges ? percentage : 'No change';
  const statPercentageDiffClass = hasStatChanges ? 'font-bold' : 'font-normal';

  return (
    <div className="flex w-auto max-w-md flex-col gap-y-2 rounded-2xl bg-white px-8 py-6 shadow">
      <p className="text-left text-xs font-bold text-gray-700">{title}</p>
      <p className="text-left text-5xl font-bold text-purple-700">
        {value || defaultValue}
      </p>
      <p className="text-left text-xs font-normal text-gray-700">
        <span className={statPercentageDiffClass}>
          {statPercentageDiffValue}
        </span>{' '}
        from previous 30 days
      </p>
    </div>
  );
};

export default StatsCard;
