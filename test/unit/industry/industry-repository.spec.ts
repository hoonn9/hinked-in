import { Test, TestingModule } from '@nestjs/testing';
import { genUUID } from '../../../src/common/lib/uuid';
import { EntityNotExistException } from '../../../src/common/exception/custom-excpetion/entity-not-exist-exception';
import { MockTypeOrmFactory } from '../../lib/mock/mock-typeorm';
import { IndustryPaginationService } from '../../../src/industry/service/industry.pagination.service';
import { IndustryFixture } from '../../fixture/industry/industry-fixture';
import { IndustryRepository } from '../../../src/industry/industry.repository';

describe('IndustryQueryService', () => {
  let industryRepository: IndustryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IndustryPaginationService,
        {
          provide: IndustryRepository,
          useValue: MockTypeOrmFactory.getCustomRepository(IndustryRepository),
        },
      ],
    }).compile();

    industryRepository = module.get(IndustryRepository);
  });

  describe('findOneByIdOrFail', () => {
    it('성공 케이스', async () => {
      // Given
      const mockIndustry = IndustryFixture.createIndustryEntity();

      const getOneFn = jest
        .spyOn(industryRepository.customQueryBuilder(), 'getOne')
        .mockResolvedValue(mockIndustry);

      // When & Then
      await expect(
        industryRepository.findOneByIdOrFail(mockIndustry.id),
      ).resolves.toEqual(mockIndustry);

      expect(getOneFn).toHaveBeenCalled();
    });

    it('존재하지 않는 ID일 경우 EntityNotExistException을 발생시킨다.', async () => {
      // Given
      const getOneFn = jest
        .spyOn(industryRepository.customQueryBuilder(), 'getOne')
        .mockResolvedValue(null);

      // When & Then
      await expect(
        industryRepository.findOneByIdOrFail(genUUID()),
      ).rejects.toThrowError(EntityNotExistException);

      expect(getOneFn).toHaveBeenCalled();
    });
  });
});
