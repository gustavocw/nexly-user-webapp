export const formatSelect = (value: any): string => {
    return Array.isArray(value) ? value[0] : value;
  };
  