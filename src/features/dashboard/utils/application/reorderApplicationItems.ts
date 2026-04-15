import type { ApplicationItem } from '../../types/application.types';

export const reorderApplicationItems = (
  applicationItems: ApplicationItem[],
  reorderedApplicationItems: ApplicationItem[],
): ApplicationItem[] => {
  const orderMap = new Map<string, number>();

  reorderedApplicationItems.forEach((item, index) => {
    orderMap.set(item?.id, index);
  });

  return applicationItems.map((item) => {
    const newIndex = orderMap.get(item?.id);

    if (newIndex === undefined) return item;
    return { ...item, order_index: newIndex };
  });
};
