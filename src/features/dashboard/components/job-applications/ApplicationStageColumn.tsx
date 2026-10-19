import { useDroppable } from '@dnd-kit/react';
import { CollisionPriority } from '@dnd-kit/abstract';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import type {
  ApplicationItem,
  ApplicationStage,
} from '../../types/application.types';
import { ApplicationCard } from './ApplicationCard';

type StageColumnProps = {
  id: string;
  stage: ApplicationStage;
  applications?: ApplicationItem[];
};

export const ApplicationStageColumn = ({
  id,
  stage,
  applications = [],
}: StageColumnProps) => {
  const { ref } = useDroppable({
    id,
    type: 'stage',
    accept: ['application'],
    collisionPriority: CollisionPriority.Low,
  });
  return (
    <div ref={ref} className="flex min-w-60 flex-col gap-y-6">
      {/* Column Header */}
      <div className="w-full rounded-lg bg-gray-100 p-4">
        <h2 className="text-lg font-semibold text-gray-700">{stage.label}</h2>
      </div>

      {/* Column List */}
      <div className="flex w-full flex-col items-start justify-center gap-y-6 rounded-lg bg-gray-100 p-4">
        {applications.map((applicationItem) => (
          <ApplicationCard
            key={applicationItem.id}
            application={applicationItem}
          />
        ))}

        <Button variant="secondary">
          <Plus />
          Add item
        </Button>
      </div>
    </div>
  );
};
