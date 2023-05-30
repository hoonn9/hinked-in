export const encodeBase64 = (obj: object) => {
  return Buffer.from(JSON.stringify(obj)).toString('base64');
};

export const decodeBase64 = <T>(text: string): T | null => {
  try {
    return JSON.parse(Buffer.from(text, 'base64').toString());
  } catch (error) {
    return null;
  }
};
