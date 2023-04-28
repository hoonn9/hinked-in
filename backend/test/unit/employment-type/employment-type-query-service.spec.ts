import { Test, TestingModule } from '@nestjs/testing';
import { EmploymentTypeQueryService } from '../../../src/employment-type/service/employment-type-query.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EmploymentTypeEntity } from '../../../src/employment-type/entity/employment-type.entity';
import { Repository } from 'typeorm';
import { genUUID } from '../../../src/common/lib/uuid';
import { EntityNotExistException } from '../../../src/common/exception/custom-excpetion/entity-not-exist-exception';
import { EmploymentTypeFixture } from '../../fixture/employment-type/employment-type-fixture';
import { mockRepository } from '../../lib/mock/mock-typeorm';

describe('EmploymentTypeQueryService', () => {
  let employmentTypeQueryService: EmploymentTypeQueryService;
  let employmentTypeRepository: Repository<EmploymentTypeEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmploymentTypeQueryService,
        {
          provide: getRepositoryToken(EmploymentTypeEntity),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    employmentTypeQueryService = module.get<EmploymentTypeQueryService>(
      EmploymentTypeQueryService,
    );
    employmentTypeRepository = module.get(
      getRepositoryToken(EmploymentTypeEntity),
    );
  });

  describe('findOneByIdOrFail', () => {
    it('성공 케이스', async () => {
      // Given
      const mockEmploymentType =
        EmploymentTypeFixture.createEmploymentTypeEntity();

      const getOneFn = jest
        .spyOn(employmentTypeRepository.createQueryBuilder(), 'getOne')
        .mockResolvedValue(mockEmploymentType);

      // When & Then
      await expect(
        employmentTypeQueryService.findOneByIdOrFail(mockEmploymentType.id),
      ).resolves.toEqual(mockEmploymentType);

      expect(getOneFn).toHaveBeenCalled();
    });

    it('존재하지 않는 ID일 경우 EntityNotExistException을 발생시킨다.', async () => {
      // Given
      const getOneFn = jest
        .spyOn(employmentTypeRepository.createQueryBuilder(), 'getOne')
        .mockResolvedValue(null);

      // When & Then
      await expect(
        employmentTypeQueryService.findOneByIdOrFail(genUUID()),
      ).rejects.toThrowError(EntityNotExistException);

      expect(getOneFn).toHaveBeenCalled();
    });
  });

  describe('isExistingName', () => {
    it('성공 케이스', async () => {
      // Given
      const mockEmploymentType =
        EmploymentTypeFixture.createEmploymentTypeEntity();

      const getExistsFn = jest
        .spyOn(employmentTypeRepository.createQueryBuilder(), 'getExists')
        .mockResolvedValue(true);

      // When & Then
      await expect(
        employmentTypeQueryService.isExistingName(mockEmploymentType.name),
      ).resolves.toEqual(true);

      expect(getExistsFn).toHaveBeenCalled();
    });
  });
});
