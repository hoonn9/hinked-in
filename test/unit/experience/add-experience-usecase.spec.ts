import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceService } from '../../../src/experience/experience.service';
import { CreateExperienceBodyDto } from '../../../src/experience/dto/create-experience.dto';
import { faker } from '@faker-js/faker';
import { MemberFixture } from '../../fixture/member/member-fixture';
import { CompanyFixture } from '../../fixture/company/company-fixture';
import { EmploymentTypeFixture } from '../../fixture/employment-type/employment-type-fixture';
import { EntityNotExistException } from '../../../src/common/exception/custom-excpetion/entity-not-exist-exception';
import { IndustryFixture } from '../../fixture/industry/industry-fixture';
import { EmploymentTypeRepository } from '../../../src/employment-type/employment-type.repository';
import { CompanyRepository } from '../../../src/company/repository/company.repository';
import { IndustryRepository } from '../../../src/industry/industry.repository';
import { ExperienceRepository } from '../../../src/experience/experience.repository';
import { MockTypeOrmFactory } from '../../lib/mock/mock-typeorm';

describe('AddExperience UseCase', () => {
  let experienceService: ExperienceService;
  let employmentTypeRepository: EmploymentTypeRepository;
  let companyRepository: CompanyRepository;
  let industryRepository: IndustryRepository;

  beforeEach(async () => {
    const mockEmploymentTypeRepository = {
      findOneByIdOrFail: jest.fn(),
    };
    const mockCompanyRepository = {
      findOneByIdOrFail: jest.fn(),
    };
    const mockIndustryRepository = {
      findOneByIdOrFail: jest.fn(),
    };
    const mockExperienceRepository = {};

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExperienceService,
        {
          provide: EmploymentTypeRepository,
          useValue: mockEmploymentTypeRepository,
        },
        {
          provide: CompanyRepository,
          useValue: mockCompanyRepository,
        },
        {
          provide: IndustryRepository,
          useValue: mockIndustryRepository,
        },
        {
          provide: ExperienceRepository,
          useValue: mockExperienceRepository,
        },
      ],
    }).compile();

    experienceService = module.get(ExperienceService);
    employmentTypeRepository = module.get(EmploymentTypeRepository);
    companyRepository = module.get(CompanyRepository);
    industryRepository = module.get(IndustryRepository);
  });

  it('성공 케이스', async () => {
    // Given
    const mockEmploymentType =
      EmploymentTypeFixture.createEmploymentTypeEntity();
    const mockCompany = CompanyFixture.createCompanyEntity();
    const mockIndustry = IndustryFixture.createIndustryEntity();
    const mockMember = MemberFixture.createMemberEntity();

    const employmentTypeFn = jest
      .spyOn(employmentTypeRepository, 'findOneByIdOrFail')
      .mockResolvedValueOnce(mockEmploymentType);

    const companyFn = jest
      .spyOn(companyRepository, 'findOneByIdOrFail')
      .mockResolvedValueOnce(mockCompany);

    const industryFn = jest
      .spyOn(industryRepository, 'findOneByIdOrFail')
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
      experienceService.addExperience(
        input,
        mockMember,
        MockTypeOrmFactory.getEntityManager(),
      ),
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
      .spyOn(employmentTypeRepository, 'findOneByIdOrFail')
      .mockImplementationOnce(() =>
        Promise.reject(new EntityNotExistException()),
      );

    jest
      .spyOn(companyRepository, 'findOneByIdOrFail')
      .mockResolvedValueOnce(mockCompany);

    jest
      .spyOn(industryRepository, 'findOneByIdOrFail')
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
      experienceService.addExperience(
        input,
        mockMember,
        MockTypeOrmFactory.getEntityManager(),
      ),
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
      .spyOn(employmentTypeRepository, 'findOneByIdOrFail')
      .mockResolvedValueOnce(mockEmploymentType);

    const companyFn = jest
      .spyOn(companyRepository, 'findOneByIdOrFail')
      .mockImplementationOnce(() =>
        Promise.reject(new EntityNotExistException()),
      );

    jest
      .spyOn(industryRepository, 'findOneByIdOrFail')
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
      experienceService.addExperience(
        input,
        mockMember,
        MockTypeOrmFactory.getEntityManager(),
      ),
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
      .spyOn(employmentTypeRepository, 'findOneByIdOrFail')
      .mockResolvedValueOnce(mockEmploymentType);

    jest
      .spyOn(companyRepository, 'findOneByIdOrFail')
      .mockResolvedValueOnce(mockCompany);

    const industryFn = jest
      .spyOn(industryRepository, 'findOneByIdOrFail')
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
      experienceService.addExperience(
        input,
        mockMember,
        MockTypeOrmFactory.getEntityManager(),
      ),
    ).rejects.toThrow(EntityNotExistException);

    expect(industryFn).toHaveBeenCalledWith(input.industryId);
  });
});
