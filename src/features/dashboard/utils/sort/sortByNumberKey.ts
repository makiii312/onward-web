export const sortByNumberKey =
  <T>(key: keyof T) =>
  (firstItem: T, secondItem: T) =>
    (firstItem[key] as number) - (secondItem[key] as number);
