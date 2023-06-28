import { Injectable } from '@nestjs/common';
import { EntityPaginationOption } from '../../common/interface/entity-pagination.interface';
import { EntitySortOption } from '../../common/interface/entity-sort.interface';
import { EntityManager } from 'typeorm';
import { PostRepository } from '../repository/post.repository';
import { CorePaginationService } from '../../common/service/core-pagination.service';
import { PostEntity } from '../entity/post.entity';
import { PostCursor } from '../typing/post-cursor.type';
import { CustomQueryBuilder } from '../../database/typeorm/custom-query-builder';
import { MemberEntity } from '../../member/entity/member.entity';

@Injectable()
export class PostPaginationService extends CorePaginationService<PostEntity> {
  constructor(private readonly postRepository: PostRepository) {
    super();
  }

  async paginate(
    pagination: EntityPaginationOption,
    sortOptions?: EntitySortOption[],
    manager?: EntityManager,
  ) {
    const qb = await this.applyPaginationToQueryBuilder(
      this.postRepository.customQueryBuilder('post', manager),
      pagination,
      sortOptions,
    );

    return this.getPaginationResult(qb, pagination, sortOptions);
  }

  async paginateByFollowingPosts(
    member: MemberEntity,
    pagination: EntityPaginationOption,
    sortOptions?: EntitySortOption[],
    manager?: EntityManager,
  ) {
    const qb = await this.applyPaginationToQueryBuilder(
      this.postRepository.getFollowingPostsQueryBuilder(member, manager),
      pagination,
      sortOptions,
    );

    return this.getPaginationResult(qb, pagination, sortOptions);
  }

  private async applyPaginationToQueryBuilder(
    qb: CustomQueryBuilder<PostEntity>,
    pagination: EntityPaginationOption,
    sortOptions?: EntitySortOption[],
  ) {
    if (sortOptions) {
      this.applySort(qb, sortOptions);
    }

    if (pagination) {
      await this.applyPagination(qb, PostCursor, pagination, sortOptions);
    }

    return qb;
  }
}
