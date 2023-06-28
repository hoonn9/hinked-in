import { Injectable } from '@nestjs/common';
import { MemberEntity } from '../../member/entity/member.entity';
import { EntitySortQueryDto } from '../../common/dto/entity-sort.dto';
import {
  PaginationQueryDto,
  PaginationResponseDto,
} from '../../common/dto/pagination.dto';
import { PostPaginationService } from './post.pagination.service';
import { PostDto } from '../dto/post.dto';

@Injectable()
export class MemberFollowingPostService {
  constructor(private readonly postPaginationService: PostPaginationService) {}

  async getMemberFollowingPosts(
    member: MemberEntity,
    paginationQuery: PaginationQueryDto,
    sortQuery?: EntitySortQueryDto,
  ): Promise<PaginationResponseDto<PostDto>> {
    const result = await this.postPaginationService.paginateByFollowingPosts(
      member,
      paginationQuery,
      sortQuery?.options,
    );
    return {
      list: result.list,
      metadata: {
        nextCursor: result.nextCursor,
      },
    };
  }
}
