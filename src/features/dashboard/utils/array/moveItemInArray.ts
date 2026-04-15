export const moveItemInArray = <T>(
  items: T[],
  fromIndex: number,
  toIndex: number,
) => {
  const updatedItemList = [...items];
  const [movedItem] = updatedItemList.splice(fromIndex, 1);
  updatedItemList.splice(toIndex, 0, movedItem);
  return updatedItemList;
};
