import { Test } from '@nestjs/testing';
import { EmploymentTypeService } from '../../../src/employment-type/employment-type.service';
import { EmploymentTypeQueryService } from '../../../src/employment-type/service/employment-type-query.service';
import { mockEntityManager } from '../../lib/mock/mock-typeorm';
import { faker } from '@faker-js/faker';
import { AlreadyExistError } from '../../../src/common/error/already-exist.error';

const mockEmploymentTypeQueryService = {
  isExistingName: jest.fn(),
};

describe('EmploymentTypeService', () => {
  let employmentTypeService: EmploymentTypeService;
  let employmentTypeQueryService: EmploymentTypeQueryService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        EmploymentTypeService,
        {
          provide: EmploymentTypeQueryService,
          useValue: mockEmploymentTypeQueryService,
        },
      ],
    }).compile();

    employmentTypeService = testingModule.get(EmploymentTypeService);
    employmentTypeQueryService = testingModule.get(EmploymentTypeQueryService);
  });

  describe('addEmploymentType', () => {
    it('성공 케이스', async () => {
      // given
      const isExistingNameFn = jest
        .spyOn(employmentTypeQueryService, 'isExistingName')
        .mockImplementation(async () => false);

      const name = faker.name.jobTitle();
      const manager = mockEntityManager();

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
        .spyOn(employmentTypeQueryService, 'isExistingName')
        .mockImplementation(async () => true);

      // when
      // then
      await expect(
        employmentTypeService.addEmploymentType(
          {
            name: faker.name.jobTitle(),
          },
          mockEntityManager(),
        ),
      ).rejects.toThrow(AlreadyExistError);
    });
  });
});
