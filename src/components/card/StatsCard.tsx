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
    <div className="flex flex-col w-auto max-w-md rounded-2xl bg-white px-8 py-6 shadow gap-y-2">
      <p className="text-left text-xs font-bold text-grey-700">{title}</p>
      <p className="text-left text-5xl font-bold text-purple-700">
        {value || defaultValue}
      </p>
      <p className="text-left text-xs font-normal text-grey-700">
        <span className={statPercentageDiffClass}>
          {statPercentageDiffValue}
        </span>{' '}
        from previous 30 days
      </p>
    </div>
  );
};

export default StatsCard;
