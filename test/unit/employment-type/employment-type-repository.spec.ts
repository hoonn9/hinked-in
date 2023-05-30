import { Test, TestingModule } from '@nestjs/testing';
import { genUUID } from '../../../src/common/lib/uuid';
import { EntityNotExistException } from '../../../src/common/exception/custom-excpetion/entity-not-exist-exception';
import { EmploymentTypeFixture } from '../../fixture/employment-type/employment-type-fixture';
import { MockTypeOrmFactory } from '../../lib/mock/mock-typeorm';
import { EmploymentTypeRepository } from '../../../src/employment-type/employment-type.repository';

describe('EmploymentTypeRepository', () => {
  let employmentTypeRepository: EmploymentTypeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: EmploymentTypeRepository,
          useValue: MockTypeOrmFactory.getCustomRepository(
            EmploymentTypeRepository,
          ),
        },
      ],
    }).compile();

    employmentTypeRepository = module.get<EmploymentTypeRepository>(
      EmploymentTypeRepository,
    );
  });

  describe('findOneByIdOrFail', () => {
    it('성공 케이스', async () => {
      // Given
      const mockEmploymentType =
        EmploymentTypeFixture.createEmploymentTypeEntity();

      const getOneFn = jest
        .spyOn(employmentTypeRepository.customQueryBuilder(), 'getOne')
        .mockResolvedValue(mockEmploymentType);

      // When & Then
      await expect(
        employmentTypeRepository.findOneByIdOrFail(mockEmploymentType.id),
      ).resolves.toEqual(mockEmploymentType);

      expect(getOneFn).toHaveBeenCalled();
    });

    it('존재하지 않는 ID일 경우 EntityNotExistException을 발생시킨다.', async () => {
      // Given
      const getOneFn = jest
        .spyOn(employmentTypeRepository.customQueryBuilder(), 'getOne')
        .mockResolvedValue(null);

      // When & Then
      await expect(
        employmentTypeRepository.findOneByIdOrFail(genUUID()),
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
        .spyOn(employmentTypeRepository.customQueryBuilder(), 'getExists')
        .mockResolvedValue(true);

      // When & Then
      await expect(
        employmentTypeRepository.isExistingName(mockEmploymentType.name),
      ).resolves.toEqual(true);

      expect(getExistsFn).toHaveBeenCalled();
    });
  });
});
