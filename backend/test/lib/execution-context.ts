import { ExecutionContext } from '@nestjs/common';

export const mockExecutionContextRequestBody = (body: Record<any, any>) => {
  return {
    switchToHttp: () => ({
      getRequest: () => ({
        body: body,
      }),
    }),
  } as ExecutionContext;
};
