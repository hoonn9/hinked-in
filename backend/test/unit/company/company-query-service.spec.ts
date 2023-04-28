import { Test, TestingModule } from '@nestjs/testing';
import { CompanyQueryService } from '../../../src/company/service/company-query.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CompanyEntity } from '../../../src/company/entity/company.entity';
import { mockRepository } from '../../lib/mock/mock-typeorm';
import { Repository } from 'typeorm';
import { CompanyFixture } from '../../fixture/company/company-fixture';
import { EntityNotExistException } from '../../../src/common/exception/custom-excpetion/entity-not-exist-exception';

describe('CompanyQueryService', () => {
  let companyQueryService: CompanyQueryService;
  let companyRepository: Repository<CompanyEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyQueryService,
        {
          provide: getRepositoryToken(CompanyEntity),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    companyQueryService = module.get<CompanyQueryService>(CompanyQueryService);
    companyRepository = module.get<Repository<CompanyEntity>>(
      getRepositoryToken(CompanyEntity),
    );
  });

  describe('findOneByIdOrFail', () => {
    it('성공 케이스', async () => {
      const mockCompany = CompanyFixture.createCompanyEntity();

      const getOneFn = jest
        .spyOn(companyRepository.createQueryBuilder(), 'getOne')
        .mockResolvedValueOnce(mockCompany);

      await expect(
        companyQueryService.findOneByIdOrFail(mockCompany.id),
      ).resolves.toEqual(mockCompany);

      expect(getOneFn).toBeCalledTimes(1);
    });

    it('존재하지 않는 ID일 경우 EntityNotExistException 예외를 발생시킨다.', async () => {
      const mockCompany = CompanyFixture.createCompanyEntity();

      const getOneFn = jest
        .spyOn(companyRepository.createQueryBuilder(), 'getOne')
        .mockResolvedValueOnce(null);

      await expect(
        companyQueryService.findOneByIdOrFail(mockCompany.id),
      ).rejects.toThrowError(EntityNotExistException);

      expect(getOneFn).toBeCalledTimes(1);
    });
  });
});
