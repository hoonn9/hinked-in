import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TransactionRequest } from '../type/transaction-manager.type';

export const TransactionContext = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: TransactionRequest = ctx.switchToHttp().getRequest();
    return request.transactionManager;
  },
);
