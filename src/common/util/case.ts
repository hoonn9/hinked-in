export const snakeToCamel = (text: string): string => {
  return text.replace(/(_\w)/g, (m) => m[1].toUpperCase());
};

export const camelToSnake = (text: string): string => {
  return text.replace(/[A-Z]/g, (m) => '_' + m.toLowerCase());
};
