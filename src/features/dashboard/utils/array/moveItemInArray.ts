export const moveItemInArray = <T>(
  items: T[],
  fromIndex: number,
  toIndex: number,
) => {
  // handle invalid fromIndex value
  if (fromIndex < 0 || fromIndex >= length || items.length === 0) {
    return items;
  }

  const updatedItemList = [...items];
  const [movedItem] = updatedItemList.splice(fromIndex, 1);

  if (movedItem === undefined) {
    return items;
  }

  updatedItemList.splice(toIndex, 0, movedItem);
  return updatedItemList;
};
