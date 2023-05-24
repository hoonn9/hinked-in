import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceService } from '../../../src/experience/experience.service';
import { CreateExperienceBodyDto } from '../../../src/experience/dto/create-experience.dto';
import { EmploymentTypeQueryService } from '../../../src/employment-type/service/employment-type-query.service';
import { CompanyQueryService } from '../../../src/company/service/company-query.service';
import { faker } from '@faker-js/faker';
import { MemberFixture } from '../../fixture/member/member-fixture';
import { CompanyFixture } from '../../fixture/company/company-fixture';
import { EmploymentTypeFixture } from '../../fixture/employment-type/employment-type-fixture';
import { mockEntityManager } from '../../lib/mock/mock-typeorm';
import { EntityNotExistException } from '../../../src/common/exception/custom-excpetion/entity-not-exist-exception';
import { IndustryFixture } from '../../fixture/industry/industry-fixture';
import { IndustryQueryService } from '../../../src/industry/service/industry-query.service';
import { ExperienceQueryService } from '../../../src/experience/service/experience-query.service';

describe('AddExperience UseCase', () => {
  let experienceService: ExperienceService;
  let employmentTypeQueryService: EmploymentTypeQueryService;
  let companyQueryService: CompanyQueryService;
  let industryQueryService: IndustryQueryService;

  beforeEach(async () => {
    const mockEmploymentTypeQueryService = {
      findOneByIdOrFail: jest.fn(),
    };
    const mockCompanyQueryService = {
      findOneByIdOrFail: jest.fn(),
    };
    const mockIndustryQueryService = {
      findOneByIdOrFail: jest.fn(),
    };
    const mockExperienceQueryService = {};

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExperienceService,
        {
          provide: EmploymentTypeQueryService,
          useValue: mockEmploymentTypeQueryService,
        },
        {
          provide: CompanyQueryService,
          useValue: mockCompanyQueryService,
        },
        {
          provide: IndustryQueryService,
          useValue: mockIndustryQueryService,
        },
        {
          provide: ExperienceQueryService,
          useValue: mockExperienceQueryService,
        },
      ],
    }).compile();

    experienceService = module.get(ExperienceService);
    employmentTypeQueryService = module.get(EmploymentTypeQueryService);
    companyQueryService = module.get(CompanyQueryService);
    industryQueryService = module.get(IndustryQueryService);
  });

  it('성공 케이스', async () => {
    // Given
    const mockEmploymentType =
      EmploymentTypeFixture.createEmploymentTypeEntity();
    const mockCompany = CompanyFixture.createCompanyEntity();
    const mockIndustry = IndustryFixture.createIndustryEntity();
    const mockMember = MemberFixture.createMemberEntity();

    const employmentTypeFn = jest
      .spyOn(employmentTypeQueryService, 'findOneByIdOrFail')
      .mockResolvedValueOnce(mockEmploymentType);

    const companyFn = jest
      .spyOn(companyQueryService, 'findOneByIdOrFail')
      .mockResolvedValueOnce(mockCompany);

    const industryFn = jest
      .spyOn(industryQueryService, 'findOneByIdOrFail')
      .mockResolvedValueOnce(mockIndustry);

    // When
    const input: CreateExperienceBodyDto = {
      employmentTypeId: mockEmploymentType.id,
      companyId: mockCompany.id,
      industryId: mockIndustry.id,
      location: faker.word.noun(),
      description: faker.lorem.paragraph(),
      headline: faker.lorem.text(),
      title: faker.lorem.text(),
      endDate: faker.date.future(),
      startDate: faker.date.past(),
    };

    // Then
    await expect(
      experienceService.addExperience(input, mockMember, mockEntityManager()),
    ).resolves.not.toThrow();

    expect(employmentTypeFn).toHaveBeenCalledWith(input.employmentTypeId);
    expect(companyFn).toHaveBeenCalledWith(input.companyId);
    expect(industryFn).toHaveBeenCalledWith(input.industryId);
  });

  it('존재하지 않는 EmploymentType의 ID일 경우 EntityNotExistException을 발생시킨다', async () => {
    // Given

    const mockEmploymentType =
      EmploymentTypeFixture.createEmploymentTypeEntity();
    const mockCompany = CompanyFixture.createCompanyEntity();
    const mockIndustry = IndustryFixture.createIndustryEntity();
    const mockMember = MemberFixture.createMemberEntity();

    const employmentTypeFn = jest
      .spyOn(employmentTypeQueryService, 'findOneByIdOrFail')
      .mockImplementationOnce(() =>
        Promise.reject(new EntityNotExistException()),
      );

    jest
      .spyOn(companyQueryService, 'findOneByIdOrFail')
      .mockResolvedValueOnce(mockCompany);

    jest
      .spyOn(industryQueryService, 'findOneByIdOrFail')
      .mockResolvedValueOnce(mockIndustry);

    // When
    const input: CreateExperienceBodyDto = {
      employmentTypeId: mockEmploymentType.id,
      companyId: mockCompany.id,
      industryId: mockIndustry.id,
      location: faker.word.noun(),
      description: faker.lorem.paragraph(),
      headline: faker.lorem.text(),
      title: faker.lorem.text(),
      endDate: faker.date.future(),
      startDate: faker.date.past(),
    };

    // Then
    await expect(
      experienceService.addExperience(input, mockMember, mockEntityManager()),
    ).rejects.toThrow(EntityNotExistException);

    expect(employmentTypeFn).toHaveBeenCalledWith(input.employmentTypeId);
  });

  it('존재하지 않는 Company의 ID일 경우 EntityNotExistException을 발생시킨다', async () => {
    // Given
    const mockEmploymentType =
      EmploymentTypeFixture.createEmploymentTypeEntity();
    const mockCompany = CompanyFixture.createCompanyEntity();
    const mockIndustry = IndustryFixture.createIndustryEntity();
    const mockMember = MemberFixture.createMemberEntity();

    jest
      .spyOn(employmentTypeQueryService, 'findOneByIdOrFail')
      .mockResolvedValueOnce(mockEmploymentType);

    const companyFn = jest
      .spyOn(companyQueryService, 'findOneByIdOrFail')
      .mockImplementationOnce(() =>
        Promise.reject(new EntityNotExistException()),
      );

    jest
      .spyOn(industryQueryService, 'findOneByIdOrFail')
      .mockResolvedValueOnce(mockIndustry);

    // When
    const input: CreateExperienceBodyDto = {
      employmentTypeId: mockEmploymentType.id,
      companyId: mockCompany.id,
      industryId: mockIndustry.id,
      location: faker.word.noun(),
      description: faker.lorem.paragraph(),
      headline: faker.lorem.text(),
      title: faker.lorem.text(),
      endDate: faker.date.future(),
      startDate: faker.date.past(),
    };

    // Then
    await expect(
      experienceService.addExperience(input, mockMember, mockEntityManager()),
    ).rejects.toThrow(EntityNotExistException);

    expect(companyFn).toHaveBeenCalledWith(input.companyId);
  });

  it('존재하지 않는 Industry의 ID일 경우 EntityNotExistException을 발생시킨다', async () => {
    // Given
    const mockEmploymentType =
      EmploymentTypeFixture.createEmploymentTypeEntity();
    const mockCompany = CompanyFixture.createCompanyEntity();
    const mockIndustry = IndustryFixture.createIndustryEntity();
    const mockMember = MemberFixture.createMemberEntity();

    jest
      .spyOn(employmentTypeQueryService, 'findOneByIdOrFail')
      .mockResolvedValueOnce(mockEmploymentType);

    jest
      .spyOn(companyQueryService, 'findOneByIdOrFail')
      .mockResolvedValueOnce(mockCompany);

    const industryFn = jest
      .spyOn(industryQueryService, 'findOneByIdOrFail')
      .mockImplementationOnce(() =>
        Promise.reject(new EntityNotExistException()),
      );

    // When
    const input: CreateExperienceBodyDto = {
      employmentTypeId: mockEmploymentType.id,
      companyId: mockCompany.id,
      industryId: mockIndustry.id,
      location: faker.word.noun(),
      description: faker.lorem.paragraph(),
      headline: faker.lorem.text(),
      title: faker.lorem.text(),
      endDate: faker.date.future(),
      startDate: faker.date.past(),
    };

    // Then
    await expect(
      experienceService.addExperience(input, mockMember, mockEntityManager()),
    ).rejects.toThrow(EntityNotExistException);

    expect(industryFn).toHaveBeenCalledWith(input.industryId);
  });
});
