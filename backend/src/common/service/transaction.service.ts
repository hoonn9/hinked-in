import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(protected readonly dataSource: DataSource) {}

  async connectTransaction() {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    return queryRunner;
  }

  async commit(queryRunner: QueryRunner) {
    await queryRunner.commitTransaction();
    await queryRunner.release();
  }

  async rollback(queryRunner: QueryRunner) {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
  }
}
