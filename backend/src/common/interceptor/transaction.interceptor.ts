import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { catchError, Observable, tap } from 'rxjs';
import { TransactionRequest } from '../type/transaction-manager.type';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(private readonly dataSource: DataSource) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request: TransactionRequest = context.switchToHttp().getRequest();

    const queryRunner = await this.connect();
    this.setRequestProperty(request, queryRunner);

    return next
      .handle()
      .pipe(this.catchPipe(queryRunner), this.commitPipe(queryRunner));
  }

  private catchPipe(queryRunner: QueryRunner) {
    return catchError(async (e) => {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw e;
    });
  }

  private commitPipe(queryRunner: QueryRunner) {
    return tap(async () => {
      await queryRunner.commitTransaction();
      await queryRunner.release();
    });
  }

  private async connect() {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    return queryRunner;
  }

  private setRequestProperty(
    request: TransactionRequest,
    queryRunner: QueryRunner,
  ): void {
    request.transactionManager = queryRunner.manager;
  }
}
