import { EntityManager } from 'typeorm';
import { CustomRepository } from '../../common/decorator/custom-repository.decorator';
import { CoreCustomRepository } from '../../database/typeorm/core-custom.repository';
import { MemberEntity } from '../../member/entity/member.entity';
import { PostEntity } from '../entity/post.entity';
import { CompanyEntity } from '../../company/entity/company.entity';

@CustomRepository(PostEntity)
export class PostRepository extends CoreCustomRepository<PostEntity> {
  async createMemberPost(
    content: string,
    member: MemberEntity,
    manager: EntityManager,
  ) {
    const postEntity = PostEntity.new({
      authorId: member.id,
      authorType: 'MEMBER',
      content: content,
    });

    await manager.insert(PostEntity, postEntity);
  }

  async createCompanyPost(
    content: string,
    company: CompanyEntity,
    manager: EntityManager,
  ) {
    const postEntity = PostEntity.new({
      authorId: company.id,
      authorType: 'COMPANY',
      content: content,
    });

    await manager.insert(PostEntity, postEntity);
  }
}
