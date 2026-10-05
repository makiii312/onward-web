import { format, parseISO, isValid, getUnixTime } from 'date-fns';

/**
 * Safely converts string | Date → Date
 */
export const toDate = (value: string | Date): Date => {
  if (value instanceof Date) {
    if (!isValid(value)) {
      throw new Error('Invalid Date object');
    }
    return value;
  }

  // Only parse ISO strings (safe + predictable)
  const parsed = parseISO(value);

  if (!isValid(parsed)) {
    throw new Error(`Invalid ISO date string: ${value}`);
  }

  return parsed;
};

/**
 * Formats date → Mar 3, 2026
 */
export const formatDate = (value: string | Date): string => {
  const date = toDate(value);
  return format(date, 'MMM d, yyyy');
};

/**
 * Formats date → unix timestamp (seconds since epoch)
 */
export const formatUnixTimestamp = (value: string | Date): number => {
  const date = toDate(value);
  return getUnixTime(date);
};

/**
 * Converts ISO string → Date
 */
export const parseDateString = (value: string): Date => {
  const parsed = parseISO(value);

  if (!isValid(parsed)) {
    throw new Error(`Invalid ISO date string: ${value}`);
  }

  return parsed;
};
