import { Injectable } from '@nestjs/common';
import { PostRepository } from '../repository/post.repository';
import { MemberEntity } from '../../member/entity/member.entity';
import { CreateCompanyPostBodyDto } from '../dto/create-company-post.dto';
import { EntityManager } from 'typeorm';
import { CompanyRepository } from '../../company/repository/company.repository';
import { AccessDeniedException } from '../../auth/exception/access-denied.exception';

@Injectable()
export class CompanyPostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async addCompanyPost(
    companyId: string,
    body: CreateCompanyPostBodyDto,
    member: MemberEntity,
    manager: EntityManager,
  ) {
    const company = await this.companyRepository.findOneByIdOrFail(
      companyId,
      manager,
    );

    if (company.ownerId !== member.id) {
      throw new AccessDeniedException();
    }

    await this.postRepository.createCompanyPost(body.content, company, manager);
  }
}
