export function mockAllFields<T>(
  classRef: new (...args: any[]) => T,
): jest.Mocked<T> {
  const mockedObject = {} as jest.Mocked<T>;

  Object.getOwnPropertyNames(classRef.prototype).forEach((methodName) => {
    if (methodName !== 'constructor') {
      const key = methodName as keyof T;
      mockedObject[key] = jest.fn() as any;
    }
  });

  return mockedObject;
}
