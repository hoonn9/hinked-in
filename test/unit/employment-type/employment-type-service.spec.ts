import { Test } from '@nestjs/testing';
import { EmploymentTypeService } from '../../../src/employment-type/employment-type.service';
import { EmploymentTypePaginationService } from '../../../src/employment-type/service/employment-type.pagination.service';
import { faker } from '@faker-js/faker';
import { AlreadyExistError } from '../../../src/common/error/already-exist.error';
import { EmploymentTypeRepository } from '../../../src/employment-type/employment-type.repository';
import { MockTypeOrmFactory } from '../../lib/mock/mock-typeorm';

const mockEmploymentTypeRepository = {
  isExistingName: jest.fn(),
};

describe('EmploymentTypeService', () => {
  let employmentTypeService: EmploymentTypeService;
  let employmentTypeRepository: EmploymentTypeRepository;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        EmploymentTypeService,
        {
          provide: EmploymentTypeRepository,
          useValue: mockEmploymentTypeRepository,
        },
        {
          provide: EmploymentTypePaginationService,
          useValue: {},
        },
      ],
    }).compile();

    employmentTypeService = testingModule.get(EmploymentTypeService);
    employmentTypeRepository = testingModule.get(EmploymentTypeRepository);
  });

  describe('addEmploymentType', () => {
    it('성공 케이스', async () => {
      // given
      const isExistingNameFn = jest
        .spyOn(employmentTypeRepository, 'isExistingName')
        .mockImplementation(async () => false);

      const name = faker.name.jobTitle();
      const manager = MockTypeOrmFactory.getEntityManager();

      const saveFn = jest.spyOn(manager, 'save');

      // when
      // then
      await expect(
        employmentTypeService.addEmploymentType(
          {
            name: name,
          },
          manager,
        ),
      ).resolves.toBeUndefined();

      expect(isExistingNameFn.mock.calls[0][0]).toEqual(name);
      expect(saveFn).toHaveBeenCalled();
    });

    it('이미 존재하는 name으로 생성할 경우 AlreadyExistError를 던진다.', async () => {
      // given
      jest
        .spyOn(employmentTypeRepository, 'isExistingName')
        .mockImplementation(async () => true);

      // when
      // then
      await expect(
        employmentTypeService.addEmploymentType(
          {
            name: faker.name.jobTitle(),
          },
          MockTypeOrmFactory.getEntityManager(),
        ),
      ).rejects.toThrow(AlreadyExistError);
    });
  });
});
