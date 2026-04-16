type KeysOfType<T, TValue> = {
  [K in keyof T]-?: T[K] extends TValue ? K : never;
}[keyof T];

export const sortByNumberKey =
  <T, K extends KeysOfType<T, number>>(key: K) =>
  (firstItem: T, secondItem: T) =>
    (firstItem[key] as number) - (secondItem[key] as number);
