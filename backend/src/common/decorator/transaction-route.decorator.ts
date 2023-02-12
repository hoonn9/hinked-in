import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { TransactionInterceptor } from '../interceptor/transaction.interceptor';

export const TransactionRoute = () =>
  applyDecorators(UseInterceptors(TransactionInterceptor));
