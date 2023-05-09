import { EmploymentTypeController } from '../../../src/employment-type/employment-type.controller';
import { EmploymentTypeService } from '../../../src/employment-type/employment-type.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { EmploymentTypeEntity } from '../../../src/employment-type/entity/employment-type.entity';
import { PaginationQueryDto } from '../../../src/common/dto/pagination.dto';
import { EntitySortQueryDto } from '../../../src/common/dto/entity-sort.dto';
import { EmploymentTypeQueryService } from '../../../src/employment-type/service/employment-type-query.service';
import { EmploymentTypeSeedService } from '../../../src/seeder/service/employment-type-seed.service';
import { Repository } from 'typeorm';
import { decodeBase64 } from '../../../src/common/util/base64';
import { EmploymentTypeDto } from '../../../src/employment-type/dto/employment-type.dto';
import { faker } from '@faker-js/faker';
import { EmploymentTypeCursor } from '../../../src/employment-type/typing/employment-type-cursor.type';
import * as dayjs from 'dayjs';
import { TestingFixture } from '../../fixture/testing-fixture';

describe('EmploymentTypeController (Integration Test)', () => {
  let testingFixture: TestingFixture;
  let employmentTypeController: EmploymentTypeController;
  let employmentTypeRepository: Repository<EmploymentTypeEntity>;

  describe('getEmploymentTypes', () => {
    beforeEach(async () => {
      testingFixture = await TestingFixture.createModule({
        imports: [TypeOrmModule.forFeature([EmploymentTypeEntity])],
        controllers: [EmploymentTypeController],
        providers: [
          EmploymentTypeService,
          EmploymentTypeQueryService,
          EmploymentTypeSeedService,
        ],
      });

      employmentTypeController = testingFixture.module.get(
        EmploymentTypeController,
      );

      employmentTypeRepository = testingFixture.module.get<
        Repository<EmploymentTypeEntity>
      >(getRepositoryToken(EmploymentTypeEntity));
    });

    afterEach(async () => {
      await testingFixture.finish();
    });

    it('성공 케이스', async () => {
      // Given
      const size = 10;
      const entities: EmploymentTypeEntity[] = [];

      for (let i = 0; i < size; i++) {
        entities.push({
          id: i + faker.datatype.uuid().slice(1),
          name: String.fromCharCode('A'.charCodeAt(0) + i),
          createDate: dayjs().add(i, 'day').toDate(),
          updateDate: dayjs().add(i, 'day').toDate(),
          deleteDate: null,
        });
      }

      await employmentTypeRepository.save(entities);

      // When
      const paginationQuery: PaginationQueryDto = {
        cursor: undefined,
        limit: 2,
      };

      const sortQuery: EntitySortQueryDto = {
        options: [
          {
            field: 'name',
            order: 'ASC',
          },
        ],
      };

      // Then
      const querySize = Math.ceil(size / paginationQuery.limit);

      for (let i = 0; i < querySize; i++) {
        const queryResult = await employmentTypeController.getEmploymentTypes(
          paginationQuery,
          sortQuery,
        );

        expect(queryResult.list.length).toEqual(paginationQuery.limit);

        const isLastQuery = querySize - 1 === i;

        if (isLastQuery) {
          expect(queryResult.metadata.nextCursor).toBe(null);
        } else {
          expect(typeof queryResult.metadata.nextCursor).toBe('string');

          const nextCursor = queryResult.metadata.nextCursor as string;
          const cursor = decodeBase64<EmploymentTypeCursor>(
            nextCursor,
          ) as EmploymentTypeCursor;

          expect(cursor).not.toBe(null);
          const cursorIndex = (i + 1) * paginationQuery.limit - 1;

          expect(cursor.id).toEqual(entities[cursorIndex].id);
          expect(cursor.name).toEqual(entities[cursorIndex].name);

          paginationQuery.cursor = nextCursor;
        }

        const startIndex = i * paginationQuery.limit;

        for (let j = 0; j < paginationQuery.limit; j++) {
          const entityIndex = startIndex + j;
          expect(queryResult.list[j]).toEqual(
            EmploymentTypeDto.fromEntity(entities[entityIndex]),
          );
        }
      }
    });

    it('NextCursor는 이전 쿼리의 Sort 조건에 해당하는 필드와 마지막 원소 값을 매핑한 상태여야한다.', async () => {
      // Given
      const size = 2;
      const entities: EmploymentTypeEntity[] = [];

      for (let i = 1; i <= size; i++) {
        entities.push({
          id: i + faker.datatype.uuid().slice(1),
          name: String.fromCharCode('A'.charCodeAt(0) + i),
          createDate: dayjs().add(i, 'day').toDate(),
          deleteDate: null,
          updateDate: dayjs().add(i, 'day').toDate(),
        });
      }

      await employmentTypeRepository.save(entities);

      // When
      const paginationQuery: PaginationQueryDto = {
        cursor: undefined,
        limit: 2,
      };

      const sortQuery: EntitySortQueryDto = {
        options: [
          {
            field: 'create_date',
            order: 'ASC',
          },
          {
            field: 'name',
            order: 'DESC',
          },
        ],
      };

      // Then
      const queryResult = await employmentTypeController.getEmploymentTypes(
        paginationQuery,
        sortQuery,
      );

      expect(typeof queryResult.metadata.nextCursor).toBe('string');

      const nextCursor = queryResult.metadata.nextCursor as string;
      const cursor = decodeBase64<EmploymentTypeCursor>(
        nextCursor,
      ) as EmploymentTypeCursor;

      expect(cursor).not.toBe(null);
      const cursorIndex = paginationQuery.limit - 1;

      expect(cursor.id).toEqual(entities[cursorIndex].id);
      expect(cursor.name).toEqual(entities[cursorIndex].name);
      expect(cursor.createDate).toEqual(
        entities[cursorIndex].createDate.toISOString(),
      );
    });

    it('다음 데이터가 존재하지 않을 때 NextCursor는 null을 반환한다.', async () => {
      // Given
      const size = 2;
      const entities: EmploymentTypeEntity[] = [];

      for (let i = 0; i < size; i++) {
        entities.push({
          id: i + faker.datatype.uuid().slice(1),
          name: String.fromCharCode('A'.charCodeAt(0) + i),
          createDate: dayjs().add(i, 'day').toDate(),
          deleteDate: null,
          updateDate: dayjs().add(i, 'day').toDate(),
        });
      }

      await employmentTypeRepository.save(entities);

      // When
      const paginationQuery: PaginationQueryDto = {
        cursor: undefined,
        limit: 2,
      };

      const sortQuery: EntitySortQueryDto = {
        options: [
          {
            field: 'create_date',
            order: 'ASC',
          },
          {
            field: 'name',
            order: 'DESC',
          },
        ],
      };

      // Then
      const queryResult = await employmentTypeController.getEmploymentTypes(
        paginationQuery,
        sortQuery,
      );

      expect(queryResult.metadata.nextCursor).toBe(null);
    });

    it('주어진 정렬 조건의 값을 비교해도 모두 같을 때 ID 오름차순 기준으로 정렬한다.', async () => {
      // Given
      const entities: EmploymentTypeEntity[] = [];
      const entitySize = 10;
      const date = new Date();

      for (let i = 0; i < entitySize; i++) {
        entities.push({
          id: entitySize - i - 1 + faker.datatype.uuid().slice(1),
          name: String.fromCharCode('A'.charCodeAt(0) + i),
          createDate: date,
          updateDate: date,
          deleteDate: null,
        });
      }

      await employmentTypeRepository.save(entities);

      // When
      const paginationQuery: PaginationQueryDto = {
        cursor: undefined,
        limit: 2,
      };
      const sortQuery: EntitySortQueryDto = {
        options: [
          {
            field: 'create_date',
            order: 'ASC',
          },
        ],
      };

      // Then
      const querySize = Math.ceil(entitySize / paginationQuery.limit);

      for (let i = 0; i < querySize; i++) {
        const queryResult = await employmentTypeController.getEmploymentTypes(
          paginationQuery,
          sortQuery,
        );

        expect(queryResult.list.length).toEqual(paginationQuery.limit);

        if (queryResult.metadata.nextCursor) {
          paginationQuery.cursor = queryResult.metadata.nextCursor;
        }

        const startIndex = entitySize - i * paginationQuery.limit - 1;

        for (let j = 0; j < paginationQuery.limit; j++) {
          const entityIndex = startIndex - j;

          console.log(queryResult.list[j], entities[entityIndex]);
          expect(queryResult.list[j]).toEqual(
            EmploymentTypeDto.fromEntity(entities[entityIndex]),
          );
        }
      }
    });

    it('주어진 정렬 조건으로 비교했을 때 값이 같으면 순차적으로 다음 정렬 조건으로 비교하여 정렬한다.', async () => {
      // Given
      const entities: EmploymentTypeEntity[] = [
        {
          id: '0' + faker.datatype.uuid().slice(1),
          name: 'a',
          createDate: dayjs().add(1, 'day').toDate(),
          updateDate: dayjs().toDate(),
          deleteDate: null,
        },
        {
          id: '1' + faker.datatype.uuid().slice(1),
          name: 'b',
          createDate: dayjs().add(1, 'day').toDate(),
          updateDate: dayjs().toDate(),
          deleteDate: null,
        },
        {
          id: '2' + faker.datatype.uuid().slice(1),
          name: 'c',
          createDate: dayjs().add(1, 'day').toDate(),
          updateDate: dayjs().add(1, 'day').toDate(),
          deleteDate: null,
        },
        {
          id: '3' + faker.datatype.uuid().slice(1),
          name: 'd',
          createDate: dayjs().add(2, 'day').toDate(),
          updateDate: dayjs().add(5, 'day').toDate(),
          deleteDate: null,
        },
        {
          id: '4' + faker.datatype.uuid().slice(1),
          name: 'e',
          createDate: dayjs().toDate(),
          updateDate: dayjs().add(5, 'day').toDate(),
          deleteDate: null,
        },
        {
          id: '5' + faker.datatype.uuid().slice(1),
          name: 'f',
          createDate: dayjs().toDate(),
          updateDate: dayjs().add(6, 'day').toDate(),
          deleteDate: null,
        },
        {
          id: '6' + faker.datatype.uuid().slice(1),
          name: 'g',
          createDate: dayjs().add(3, 'day').toDate(),
          updateDate: dayjs().toDate(),
          deleteDate: null,
        },
      ];

      await employmentTypeRepository.save(entities);

      // When
      const paginationQuery: PaginationQueryDto = {
        cursor: undefined,
        limit: 2,
      };
      const sortQuery: EntitySortQueryDto = {
        options: [
          {
            field: 'create_date',
            order: 'DESC',
          },
          {
            field: 'update_date',
            order: 'DESC',
          },
          {
            field: 'name',
            order: 'ASC',
          },
        ],
      };

      // Then
      const expectSequence = [6, 3, 2, 0, 1, 5, 4];
      const querySize = Math.ceil(entities.length / paginationQuery.limit);

      for (let i = 0; i < querySize; i++) {
        const queryResult = await employmentTypeController.getEmploymentTypes(
          paginationQuery,
          sortQuery,
        );

        expect(queryResult.list.length).toBeLessThanOrEqual(
          paginationQuery.limit,
        );

        if (queryResult.metadata.nextCursor) {
          paginationQuery.cursor = queryResult.metadata.nextCursor;
        }

        const startIndex = i * paginationQuery.limit;

        for (let j = 0; j < queryResult.list.length; j++) {
          const entityIndex = startIndex + j;
          expect(queryResult.list[j]).toEqual(
            EmploymentTypeDto.fromEntity(entities[expectSequence[entityIndex]]),
          );
        }
      }
    });
  });
});
