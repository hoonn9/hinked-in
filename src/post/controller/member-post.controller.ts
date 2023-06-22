import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UseController } from '../../common/decorator/use-controller.decorator';
import { PostService } from '../post.service';
import { Body, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { Auth } from '../../auth/decorator/auth.decorator';
import { CurrentUser } from '../../auth/decorator/current-user.decorator';
import { MemberEntity } from '../../member/entity/member.entity';
import { QueryTransformPipe } from '../../common/pipe/query-transform-pipe';
import {
  PaginationQueryDto,
  PaginationResponseDto,
} from '../../common/dto/pagination.dto';
import { SortQueryPipe } from '../../common/pipe/sort-query-pipe';
import { EntitySortQueryDto } from '../../common/dto/entity-sort.dto';
import { PostDto } from '../dto/post.dto';
import { ApiHttpResponse } from '../../common/lib/swagger/decorator/api-http-response.decorator';
import { ApiHttpExceptionResponse } from '../../common/lib/swagger/decorator/api-http-exception-response.decorator';
import { TransactionRoute } from '../../common/decorator/transaction-route.decorator';
import { TransactionContext } from '../../common/decorator/transaction-manager.decorator';
import { TransactionManager } from '../../common/type/transaction-manager.type';
import { CreateMemberPostBodyDto } from '../dto/create-member-post.dto';

@ApiTags('members')
@UseController('members')
export class MemberPostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({
    description: '로그인한 멤버가 작성한 게시글 리스트를 가져옵니다.',
  })
  @ApiHttpResponse(HttpStatus.OK, [
    {
      title: '요청에 성공했을 경우',
      description: '요청에 성공했을 때의 응답입니다.',
      generic: { type: PaginationResponseDto, field: 'list' },
      type: PostDto,
    },
  ])
  @ApiHttpExceptionResponse(HttpStatus.BAD_REQUEST)
  @HttpCode(HttpStatus.OK)
  @Auth()
  @Get('me/posts')
  async getMyPosts(
    @CurrentUser() member: MemberEntity,
    @Query(new QueryTransformPipe()) paginationQuery: PaginationQueryDto,
    @Query(new SortQueryPipe(['createDate']))
    sortQuery?: EntitySortQueryDto,
  ): Promise<PaginationResponseDto<PostDto>> {
    return this.postService.paginateMemberPosts(
      member,
      paginationQuery,
      sortQuery,
    );
  }

  @ApiOperation({
    description: '게시글을 등록합니다.',
  })
  @ApiHttpResponse(HttpStatus.CREATED, [
    {
      title: '게시글 등록에 성공했을 경우',
      description: '게시글이 성공적으로 생성되었을 때의 응답입니다.',
      type: true,
    },
  ])
  @ApiHttpExceptionResponse(HttpStatus.BAD_REQUEST)
  @HttpCode(HttpStatus.CREATED)
  @Auth()
  @TransactionRoute()
  @Post('me/posts')
  async addMemberPost(
    @CurrentUser() member: MemberEntity,
    @TransactionContext() manager: TransactionManager,
    @Body() body: CreateMemberPostBodyDto,
  ): Promise<true> {
    await this.postService.addMemberPost(body, member, manager);
    return true;
  }
}
