import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceService } from '../../../src/experience/experience.service';
import { MemberFixture } from '../../fixture/member/member-fixture';
import { EmploymentTypeRepository } from '../../../src/employment-type/employment-type.repository';
import { CompanyRepository } from '../../../src/company/repository/company.repository';
import { IndustryRepository } from '../../../src/industry/industry.repository';
import { ExperienceRepository } from '../../../src/experience/experience.repository';
import { MemberRepository } from '../../../src/member/member.repository';
import { ExperienceFixture } from '../../fixture/experience/experience-fixture';
import { ExperienceDto } from '../../../src/experience/dto/experience.dto';

describe('GetMemberExperience UseCase', () => {
  let experienceService: ExperienceService;
  let experienceRepository: ExperienceRepository;
  let memberRepository: MemberRepository;

  beforeEach(async () => {
    const mockExperienceRepository = {
      createExperience: jest.fn(),
      findByMember: jest.fn(),
    };
    const mockMemberRepository = {
      findOneByIdOrFail: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExperienceService,
        {
          provide: EmploymentTypeRepository,
          useValue: {},
        },
        {
          provide: CompanyRepository,
          useValue: {},
        },
        {
          provide: IndustryRepository,
          useValue: {},
        },
        {
          provide: ExperienceRepository,
          useValue: mockExperienceRepository,
        },
        {
          provide: MemberRepository,
          useValue: mockMemberRepository,
        },
      ],
    }).compile();

    experienceService = module.get(ExperienceService);
    experienceRepository = module.get(ExperienceRepository);
    memberRepository = module.get(MemberRepository);
  });

  it('성공 케이스', async () => {
    // Given
    const member = MemberFixture.createMemberEntity();
    const experiences = Array.from({ length: 5 }, () =>
      ExperienceFixture.createExperienceEntity(),
    );

    const memberFindOneByIdOrFailFn = jest
      .spyOn(memberRepository, 'findOneByIdOrFail')
      .mockResolvedValueOnce(member);

    const experienceFindByMemberFn = jest
      .spyOn(experienceRepository, 'findByMember')
      .mockResolvedValueOnce(experiences);

    // When
    const result = await experienceService.getMemberExperiences(member.id);

    // Then
    result.forEach((experienceDto, index) => {
      expect(experienceDto).toEqual(
        ExperienceDto.fromEntity(experiences[index]),
      );
    });

    expect(memberFindOneByIdOrFailFn).toHaveBeenCalledWith(member.id);
    expect(experienceFindByMemberFn).toHaveBeenCalledWith(member);
  });
});
