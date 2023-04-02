import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DiscoveryService, MetadataScanner } from '@nestjs/core';
import { SeederService } from './seeder.abstract.service';

@Injectable()
export class SeederExecutionService {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    @Inject(DataSource)
    private readonly dataSource: DataSource,
  ) {}

  async execute() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await Promise.all(
        this.getSeederServices().map(async (service) => {
          return service.run(queryRunner.manager);
        }),
      );
      await queryRunner.commitTransaction();
    } catch (e) {
      console.error(e);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
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
