import { Injectable } from '@nestjs/common';
import { PostRepository } from './repository/post.repository';
import { MemberEntity } from '../member/entity/member.entity';
import { CreateMemberPostBodyDto } from './dto/create-member-post.dto';
import { EntityManager } from 'typeorm';
import {
  PaginationQueryDto,
  PaginationResponseDto,
} from '../common/dto/pagination.dto';
import { EntitySortQueryDto } from '../common/dto/entity-sort.dto';
import { PostPaginationService } from './service/post.pagination.service';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly postPaginationService: PostPaginationService,
  ) {}

  async paginateMemberPosts(
    member: MemberEntity,
    paginationQuery: PaginationQueryDto,
    sortQuery?: EntitySortQueryDto,
  ): Promise<PaginationResponseDto<PostDto>> {
    const result = await this.postPaginationService.paginate(
      paginationQuery,
      sortQuery?.options,
    );

    return {
      list: result.list.map(PostDto.fromEntity),
      metadata: {
        nextCursor: result.nextCursor,
      },
    };
  }

  async addMemberPost(
    body: CreateMemberPostBodyDto,
    member: MemberEntity,
    manager: EntityManager,
  ) {
    await this.postRepository.createMemberPost(body.content, member, manager);
  }
}
