import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genUUID } from '../../../src/common/lib/uuid';
import { EntityNotExistException } from '../../../src/common/exception/custom-excpetion/entity-not-exist-exception';
import {
  mockCustomQueryBuilder,
  mockRepository,
} from '../../lib/mock/mock-typeorm';
import { IndustryQueryService } from '../../../src/industry/service/industry-query.service';
import { IndustryEntity } from '../../../src/industry/entity/industry.entity';
import { IndustryFixture } from '../../fixture/industry/industry-fixture';

describe('IndustryQueryService', () => {
  let industryQueryService: IndustryQueryService;
  let industryRepository: Repository<IndustryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IndustryQueryService,
        {
          provide: getRepositoryToken(IndustryEntity),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    industryQueryService =
      module.get<IndustryQueryService>(IndustryQueryService);
    industryRepository = module.get(getRepositoryToken(IndustryEntity));
  });

  describe('findOneByIdOrFail', () => {
    it('성공 케이스', async () => {
      // Given
      const mockIndustry = IndustryFixture.createIndustryEntity();

      const customQueryBuilder = mockCustomQueryBuilder<IndustryEntity>();
      jest
        .spyOn(industryQueryService, 'createQueryBuilder')
        .mockReturnValue(customQueryBuilder);

      const getOneFn = jest
        .spyOn(customQueryBuilder, 'getOne')
        .mockResolvedValue(mockIndustry);

      // When & Then
      await expect(
        industryQueryService.findOneByIdOrFail(mockIndustry.id),
      ).resolves.toEqual(mockIndustry);

      expect(getOneFn).toHaveBeenCalled();
    });

    it('존재하지 않는 ID일 경우 EntityNotExistException을 발생시킨다.', async () => {
      // Given
      const customQueryBuilder = mockCustomQueryBuilder<IndustryEntity>();
      jest
        .spyOn(industryQueryService, 'createQueryBuilder')
        .mockReturnValue(customQueryBuilder);

      const getOneFn = jest
        .spyOn(customQueryBuilder, 'getOne')
        .mockResolvedValue(null);

      // When & Then
      await expect(
        industryQueryService.findOneByIdOrFail(genUUID()),
      ).rejects.toThrowError(EntityNotExistException);

      expect(getOneFn).toHaveBeenCalled();
    });
  });
});
