import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { catchError, Observable, tap } from 'rxjs';
import { TransactionRequest } from '../type/transaction-manager.type';
import { TransactionService } from '../service/transaction.service';

@Injectable()
export class TransactionInterceptor
  extends TransactionService
  implements NestInterceptor
{
  constructor(protected readonly dataSource: DataSource) {
    super(dataSource);
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request: TransactionRequest = context.switchToHttp().getRequest();

    const queryRunner = await this.connectTransaction();
    this.setRequestProperty(request, queryRunner);

    return next
      .handle()
      .pipe(this.catchPipe(queryRunner), this.commitPipe(queryRunner));
  }

  private catchPipe(queryRunner: QueryRunner) {
    return catchError(async (e) => {
      await this.rollback(queryRunner);
      throw e;
    });
  }

  private commitPipe(queryRunner: QueryRunner) {
    return tap(async () => {
      await this.commit(queryRunner);
    });
  }

  private setRequestProperty(
    request: TransactionRequest,
    queryRunner: QueryRunner,
  ): void {
    request.transactionManager = queryRunner.manager;
  }
}
