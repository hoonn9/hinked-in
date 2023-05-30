import { ExecutionContext } from '@nestjs/common';

export class MockHttpFactory {
  static getExecutionContextRequestBody(body: Record<string, any>) {
    return {
      switchToHttp: () => ({
        getRequest: () => ({
          body: body,
        }),
      }),
    } as ExecutionContext;
  }
}
