import type { DragEndEvent } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';
import type { ApplicationStage } from '../types/application.types';

export const useApplicationStageDrag = (
  setApplicationStages: React.Dispatch<
    React.SetStateAction<ApplicationStage[]>
  >,
) => {
  const handleApplicationStageDragEnd = (event: DragEndEvent) => {
    console.log('onDragEnd event', event);
    if (event.canceled) return;

    const { source, target } = event.operation;

    if (!source || !target) return;

    if (isSortable(source) && isSortable(target)) {
      const { initialIndex } = source;
      const { index: targetIndex } = target;

      if (initialIndex === targetIndex) return;

      if (initialIndex !== targetIndex) {
        setApplicationStages((items): ApplicationStage[] => {
          const newItems = [...items];
          const [movedItem] = newItems.splice(initialIndex, 1);
          newItems.splice(targetIndex, 0, movedItem);

          return newItems.map((item, index) => ({
            ...item,
            order_index: index,
          })) as ApplicationStage[];
        });
      }
    }
  };

  return {
    handleApplicationStageDragEnd,
  };
};
