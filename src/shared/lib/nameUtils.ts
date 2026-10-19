/**
 * Extract initials from a full name
 * @param name - Full name (e.g., "Anna Marie Doe")
 * @param maxInitials - Maximum number of initials to return (default: 2)
 * @returns Initials in uppercase (e.g., "AMD" or "AM")
 */
export const getNameInitials = (
  name: string,
  maxInitials: number = 2,
): string => {
  if (!name || typeof name !== 'string') {
    return '';
  }

  return name
    .trim()
    .split(/\s+/) // Split by whitespace
    .map((word) => word.charAt(0).toUpperCase()) // Get first character of each word
    .slice(0, maxInitials) // Limit to maxInitials
    .join('');
};

/**
 * Alternative: Get first and last initials only
 * @param name - Full name (e.g., "Anna Marie Doe")
 * @returns First and last initials (e.g., "AD")
 */
export const getFirstLastInitials = (name: string): string => {
  if (!name || typeof name !== 'string') {
    return '';
  }

  const words = name.trim().split(/\s+/);

  if (words.length === 0) return '';
  if (words.length === 1) return words[0].charAt(0).toUpperCase();

  return (
    words[0].charAt(0).toUpperCase() +
    words[words.length - 1].charAt(0).toUpperCase()
  );
};
