export const envFilePath = (function () {
  if (process.env.NODE_ENV === 'test') {
    return '.env.test';
  }

  return '.env.local';
})();
