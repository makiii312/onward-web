export const formatSnakeToTitleCase = (str: string): string => {
    if (!str || typeof str !== 'string') {
        return '';
    }
    return str.replaceAll('_', '-').replace(/\b\w/g, (c) => c.toUpperCase());
};