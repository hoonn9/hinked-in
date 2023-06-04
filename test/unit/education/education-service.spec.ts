import { Test } from '@nestjs/testing';
import { EducationService } from '../../../src/education/education.service';
import { MemberFixture } from '../../fixture/member/member-fixture';
import { CreateEducationBodyDto } from '../../../src/education/dto/create-education.dto';
import { MockTypeOrmFactory } from '../../lib/mock/mock-typeorm';
import { SchoolRepository } from '../../../src/school/school.repository';
import { EducationRepository } from '../../../src/education/education.repository';
import { faker } from '@faker-js/faker';
import { SchoolFixture } from '../../fixture/school/school-fixture';

describe('EducationService', () => {
  let educationService: EducationService;
  let schoolRepository: SchoolRepository;
  let educationRepository: EducationRepository;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        EducationService,
        {
          provide: SchoolRepository,
          useValue: {
            findOneByIdOrFail: jest.fn(),
          },
        },
        {
          provide: EducationRepository,
          useValue: {
            createEducation: jest.fn(),
          },
        },
      ],
    }).compile();

    educationService = testingModule.get(EducationService);
    schoolRepository = testingModule.get(SchoolRepository);
    educationRepository = testingModule.get(EducationRepository);
  });

  describe('createEducation', () => {
    it('성공 케이스', async () => {
      // Given
      const member = MemberFixture.createMemberEntity();
      const school = SchoolFixture.createSchoolEntity();
      const manager = MockTypeOrmFactory.getEntityManager();

      const body: CreateEducationBodyDto = {
        schoolId: school.id,
        degree: faker.lorem.lines(1),
        endDate: faker.date.future(),
        startDate: faker.date.past(),
        grade: faker.lorem.lines(1),
        fieldOfStudy: faker.lorem.lines(1),
      };

      const createEducationFn = jest.spyOn(
        educationRepository,
        'createEducation',
      );
      const findOneByIdOrFailFn = jest
        .spyOn(schoolRepository, 'findOneByIdOrFail')
        .mockResolvedValueOnce(school);

      // When
      await educationService.createEducation(member, body, manager);

      // Then
      expect(findOneByIdOrFailFn).toHaveBeenCalledWith(school.id, manager);

      const createEducationFnParam = createEducationFn.mock.calls[0];

      expect(typeof createEducationFnParam[0].id).toBe('string');

      expect(createEducationFnParam[0].degree).toBe(body.degree);
      expect(createEducationFnParam[0].endDate).toBe(body.endDate);
      expect(createEducationFnParam[0].startDate).toBe(body.startDate);
      expect(createEducationFnParam[0].grade).toBe(body.grade);
      expect(createEducationFnParam[0].fieldOfStudy).toBe(body.fieldOfStudy);

      expect(createEducationFnParam[0].school).toBe(school);
      expect(createEducationFnParam[0].member).toBe(member);
      expect(createEducationFnParam[1]).toBe(manager);
    });
  });
});
