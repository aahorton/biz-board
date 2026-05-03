export const removeUndefined = <T extends Record<string, unknown>>(
  obj: T
): T => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key as keyof T] = value as T[keyof T];
    }
    return acc;
  }, {} as T);
};
