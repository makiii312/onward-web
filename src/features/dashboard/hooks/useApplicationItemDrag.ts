import type { DragEndEvent } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';
import type { ApplicationItem } from '../types/application.types';
import {
  moveItemInArray,
  reorderApplicationItems,
  sortByNumberKey,
} from '../utils';

export const useApplicationItemDrag = (
  setApplications: React.Dispatch<React.SetStateAction<ApplicationItem[]>>,
) => {
  const handleApplicationDragEnd = (event: DragEndEvent) => {
    if (event.canceled) return;

    const { source, target } = event.operation;
    if (!source || !target) return;

    setApplications((prevApplications) => {
      let updatedApplications = structuredClone(prevApplications);

      const applicationSourceId = source?.id;
      const applicationTargetStage = (target?.group ?? target?.id) as string;

      const draggedItem = updatedApplications.find(
        (application) => application.id === applicationSourceId,
      );

      if (!draggedItem) return prevApplications;

      const applicationSourceStage = draggedItem?.status;

      // Handle application item moving to different application stage list
      if (applicationSourceStage !== applicationTargetStage) {
        draggedItem.status = applicationTargetStage;
      }

      // Handle re-order of application items within same application stage list
      if (isSortable(source) && isSortable(target)) {
        const { index: initialIndex } = source.sortable;
        const { index: targetIndex } = target.sortable;

        const listItems = updatedApplications
          .filter((item) => item.status === applicationSourceStage)
          .sort(sortByNumberKey('order_index'));

        const reorderedItems = moveItemInArray(
          listItems,
          initialIndex,
          targetIndex,
        );
        updatedApplications = reorderApplicationItems(
          updatedApplications,
          reorderedItems,
        );
      }

      return updatedApplications;
    });
  };

  return {
    handleApplicationDragEnd,
  };
};
