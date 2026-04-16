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

      const applicationSourceId = source.id;
      const applicationTargetStage = (target?.group ?? target.id) as string;

      const draggedItem = updatedApplications.find(
        (application) => application.id === applicationSourceId,
      );

      if (!draggedItem) return prevApplications;

      const applicationSourceStage = draggedItem?.status;
      const isSameStage = applicationSourceStage === applicationTargetStage;

      // Handle application item moving to different application stage list
      if (!isSameStage) {
        const updatedDraggedItem = {
          ...draggedItem,
          status: applicationTargetStage,
        };

        // Source stage items (remove dragged item)
        const sourceItems = updatedApplications
          .filter((item) => item.status === applicationSourceStage)
          .sort(sortByNumberKey('order_index'));

        const updatedSourceItems = sourceItems.filter(
          (item) => item.id !== draggedItem.id,
        );

        // Target stage items (insert dragged item)
        const targetItems = updatedApplications
          .filter((item) => item.status === applicationTargetStage)
          .sort(sortByNumberKey('order_index'));

        let insertIndex = targetItems.length;

        if (isSortable(target)) {
          const targetIndex = target.sortable.index;

          const isMovingDown =
            isSortable(source) && source.sortable.index < targetIndex;

          insertIndex = targetIndex;

          if (!isMovingDown) {
            insertIndex += 1;
          }
        }

        const updatedTargetItems = [
          ...targetItems.slice(0, insertIndex),
          updatedDraggedItem,
          ...targetItems.slice(insertIndex),
        ];

        const baseApplications = updatedApplications.filter(
          (item) => item.id !== draggedItem.id,
        );

        // Remove old dragged item & re-insert updated dragged item
        updatedApplications = [...baseApplications, updatedDraggedItem];

        // Reorder both stages
        updatedApplications = reorderApplicationItems(
          updatedApplications,
          updatedSourceItems,
        );

        updatedApplications = reorderApplicationItems(
          updatedApplications,
          updatedTargetItems,
        );

        return updatedApplications;
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
