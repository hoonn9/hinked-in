import { TransactionInterceptor } from '../../../../src/common/interceptor/transaction.interceptor';
import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { ExecutionContext } from '@nestjs/common';
import { firstValueFrom, from, of, throwError } from 'rxjs';
import {
  Column,
  DataSource,
  Entity,
  EntityManager,
  QueryRunner,
  Repository,
} from 'typeorm';
import { TransactionRequest } from '../../../../src/common/type/transaction-manager.type';

const dataSourceMock: Partial<DataSource> = {
  createQueryRunner: jest.fn(),
};

describe('TransactionInterceptor', () => {
  describe('Mock Test', () => {
    let interceptor: TransactionInterceptor;
    let mockContext: ExecutionContext;

    beforeAll(async () => {
      const module = await Test.createTestingModule({
        providers: [
          TransactionInterceptor,
          {
            provide: DataSource,
            useValue: dataSourceMock,
          },
        ],
      }).compile();

      interceptor = module.get(TransactionInterceptor);
      mockContext = {
        switchToHttp: () => ({
          getRequest: () => ({}),
        }),
      } as ExecutionContext;
    });

    const mockCreateQueryRunner = (mock: Partial<QueryRunner>) =>
      jest
        .spyOn(dataSourceMock, 'createQueryRunner')
        .mockReturnValue(mock as QueryRunner);

    it('request 객체의 field로 EntityManager가 할당되어야 한다.', async () => {
      const request = {};
      const manager = {} as EntityManager;
      const mockContext = {
        switchToHttp: () => ({
          getRequest: () => request,
        }),
      } as ExecutionContext;

      const queryRunnerMock: Partial<QueryRunner> = {
        connect: jest.fn(),
        startTransaction: jest.fn(),
        manager,
      };

      mockCreateQueryRunner(queryRunnerMock);

      await interceptor.intercept(mockContext, {
        handle: jest.fn().mockReturnValue(of(null)),
      });

      expect(request).toHaveProperty('transactionManager', manager);
    });

    it('next handler에서 예외가 발생할 경우 catchPipe를 실행한다.', async () => {
      const mockContext = {
        switchToHttp: () => ({
          getRequest: () => ({}),
        }),
      } as ExecutionContext;

      const manager = {} as EntityManager;

      const queryRunnerMock: Partial<QueryRunner> = {
        connect: jest.fn(),
        startTransaction: jest.fn(),
        rollbackTransaction: jest.fn(),
        release: jest.fn(),
        manager,
      };

      mockCreateQueryRunner(queryRunnerMock);

      const error = new Error('catchErrorMessage');
      const next = {
        handle: jest.fn().mockReturnValue(throwError(() => error)),
      };

      const intercept = await interceptor.intercept(mockContext, next);
      await expect(firstValueFrom(intercept)).rejects.toThrowError(error);

      expect(queryRunnerMock.rollbackTransaction).toHaveBeenCalled();
      expect(queryRunnerMock.release).toHaveBeenCalled();
    });

    it('next handler가 성공적으로 실행되었을 경우 commitPipe를 실행한다.', async () => {
      const mockContext = {
        switchToHttp: () => ({
          getRequest: () => ({}),
        }),
      } as ExecutionContext;

      const queryRunnerMock: Partial<QueryRunner> = {
        connect: jest.fn(),
        startTransaction: jest.fn(),
        commitTransaction: jest.fn(),
        release: jest.fn(),
        manager: {} as EntityManager,
      };

      mockCreateQueryRunner(queryRunnerMock);

      const next = {
        handle: jest.fn().mockReturnValue(of(null)),
      };

      const intercept = await interceptor.intercept(mockContext, next);
      await expect(firstValueFrom(intercept));

      expect(queryRunnerMock.commitTransaction).toHaveBeenCalled();
      expect(queryRunnerMock.release).toHaveBeenCalled();
    });
  });

  describe('Fake Test', () => {
    let interceptor: TransactionInterceptor;
    let repository: Repository<FakeEntity>;

    @Entity()
    class FakeEntity {
      @Column({ type: 'int', primary: true })
      id: number;
    }

    beforeEach(async () => {
      const module = await Test.createTestingModule({
        imports: [
          TypeOrmModule.forRoot({
            type: 'sqlite',
            database: ':memory:',
            entities: [FakeEntity],
            synchronize: true,
          }),
          TypeOrmModule.forFeature([FakeEntity]),
        ],
        providers: [TransactionInterceptor],
      }).compile();

      interceptor = module.get(TransactionInterceptor);
      repository = module.get(getRepositoryToken(FakeEntity));
    });

    it('commit transaction', async () => {
      // give
      const request = {} as TransactionRequest;
      const mockContext = {
        switchToHttp: () => ({
          getRequest: () => request,
        }),
      } as ExecutionContext;

      const next = {
        handle: () =>
          from(
            (async () => {
              const entity = new FakeEntity();
              entity.id = 1;
              await request.transactionManager.save(entity);
            })(),
          ),
      };

      // when
      const interceptObservable = await interceptor.intercept(
        mockContext,
        next,
      );

      await firstValueFrom(interceptObservable);

      const result = await repository.findOne({
        where: {
          id: 1,
        },
      });

      // then
      expect(result?.id).toEqual(1);
    });

    it('rollback transaction', async () => {
      // give
      const request = {} as TransactionRequest;
      const mockContext = {
        switchToHttp: () => ({
          getRequest: () => request,
        }),
      } as ExecutionContext;

      const error = new Error();

      const next = {
        handle: () =>
          from(
            (async () => {
              const entity = new FakeEntity();
              entity.id = 1;
              await request.transactionManager.save(entity);

              throw error;
            })(),
          ),
      };

      // when
      const interceptObservable = await interceptor.intercept(
        mockContext,
        next,
      );

      // then
      await expect(firstValueFrom(interceptObservable)).rejects.toThrowError(
        error,
      );

      const result = await repository.findOne({
        where: {
          id: 1,
        },
      });

      expect(result).toEqual(null);
    });
  });
});
