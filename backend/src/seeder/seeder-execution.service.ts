import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DiscoveryService } from '@nestjs/core';
import { SeederService } from './seeder.abstract.service';
import { TransactionService } from '../common/service/transaction.service';

@Injectable()
export class SeederExecutionService extends TransactionService {
  constructor(
    private readonly discoveryService: DiscoveryService,
    protected readonly dataSource: DataSource,
  ) {
    super(dataSource);
  }

  async execute() {
    const queryRunner = await this.connectTransaction();

    try {
      await Promise.all(
        this.getSeederServices().map(async (service) => {
          return service.run(queryRunner.manager);
        }),
      );

      await this.commit(queryRunner);
    } catch (e) {
      await this.rollback(queryRunner);
    }
  }

  private getSeederServices() {
    return this.discoveryService
      .getProviders()
      .filter((wrapper) => wrapper.isDependencyTreeStatic())
      .filter(
        ({ instance }) =>
          instance &&
          Object.getPrototypeOf(instance) &&
          instance instanceof SeederService,
      )
      .map((wrapper) => wrapper.instance);
  }
}
