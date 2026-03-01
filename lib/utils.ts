export const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

export const normalizeText = (value: unknown): string | null => {
  if (!isNonEmptyString(value)) {
    return null;
  }
  return value.trim();
};
