import { useDraggable } from '@dnd-kit/react';
import { Calendar, Globe } from 'lucide-react';
import type { ApplicationItem } from '../../types/application.types';

type ApplicationCardProps = {
  application: ApplicationItem;
};

export const ApplicationCard = ({
  application = {} as ApplicationItem,
}: ApplicationCardProps) => {
  const { ref } = useDraggable({ id: application?.id });

  return (
    <div
      ref={ref}
      className="flex min-h-38 w-full cursor-pointer flex-col justify-between rounded-lg bg-white p-4"
    >
      <div className="flex flex-col gap-y-1">
        <p className="text-base font-semibold text-black">
          {application?.job_title}
        </p>
        <p className="text-sm text-gray-700">{application?.company_name}</p>
      </div>

      <div className="flex flex-col gap-y-2">
        <p className="flex gap-x-2 text-xs text-gray-500">
          <Globe size={16} />
          {application?.job_platform}
        </p>
        {application?.date_applied && (
          <p className="flex gap-x-2 text-xs text-gray-500">
            <Calendar size={16} />
            {application.date_applied}
          </p>
        )}
      </div>
    </div>
  );
};
