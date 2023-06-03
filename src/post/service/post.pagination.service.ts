import { Injectable } from '@nestjs/common';
import { EntityPaginationOption } from '../../common/interface/entity-pagination.interface';
import { EntitySortOption } from '../../common/interface/entity-sort.interface';
import { EntityManager } from 'typeorm';
import { PostRepository } from '../repository/post.repository';
import { CorePaginationService } from '../../common/service/core-pagination.service';
import { PostEntity } from '../entity/post.entity';
import { PostCursor } from '../typing/post-cursor.type';

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
    const qb = this.postRepository.customQueryBuilder('post', manager);

    if (sortOptions) {
      this.applySort(qb, sortOptions);
    }

    if (pagination) {
      await this.applyPagination(qb, PostCursor, pagination, sortOptions);
    }

    const result = await qb.getMany();
    return this.getPaginationResult(result, pagination, sortOptions);
  }
}
