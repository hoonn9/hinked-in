import { DynamicModule, Provider, Type } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { CUSTOM_REPOSITORY } from '../../common/decorator/custom-repository.decorator';
import { DataSource } from 'typeorm';

export class TypeOrmCustomModule {
  static forCustomRepository(repositories: Type[]): DynamicModule {
    const providers = repositories
      .map((repository): Provider | null => {
        const entity = Reflect.getMetadata(CUSTOM_REPOSITORY, repository);

        if (!entity) {
          return null;
        }

        return {
          inject: [getDataSourceToken()],
          provide: repository,
          useFactory: (dataSource: DataSource) => {
            const baseRepository = dataSource.getRepository(entity);
            return new repository(
              baseRepository.target,
              baseRepository.manager,
              baseRepository.queryRunner,
            );
          },
        };
      })
      .filter((provider): provider is Provider => !!provider);

    return {
      module: TypeOrmCustomModule,
      providers,
      exports: providers,
    };
  }
}
