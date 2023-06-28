import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UseController } from '../../common/decorator/use-controller.decorator';
import { Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { MemberFollowingPostService } from '../service/member-following-post.service';
import { Auth } from '../../auth/decorator/auth.decorator';
import { CurrentUser } from '../../auth/decorator/current-user.decorator';
import { MemberEntity } from '../../member/entity/member.entity';
import { ApiHttpResponse } from '../../common/lib/swagger/decorator/api-http-response.decorator';
import {
  PaginationQueryDto,
  PaginationResponseDto,
} from '../../common/dto/pagination.dto';
import { QueryTransformPipe } from '../../common/pipe/query-transform-pipe';
import { SortQueryPipe } from '../../common/pipe/sort-query-pipe';
import { EntitySortQueryDto } from '../../common/dto/entity-sort.dto';
import { PostDto } from '../dto/post.dto';
import { ApiHttpExceptionResponse } from '../../common/lib/swagger/decorator/api-http-exception-response.decorator';

@ApiTags('members')
@UseController('members')
export class MemberFollowingPostController {
  constructor(
    private readonly memberFollowingPostService: MemberFollowingPostService,
  ) {}

  @ApiOperation({
    description: '로그인된 멤버가 팔로우한 대상의 게시글들을 가져옵니다.',
  })
  @ApiHttpResponse(HttpStatus.OK, [
    {
      title: '성공적으로 게시물을 가져왔을 경우',
      description: '성공적으로 게시물을 가져왔을 떄의 응답입니다.',
      generic: { type: PaginationResponseDto, field: 'list' },
      type: PostDto,
    },
  ])
  @ApiHttpExceptionResponse(HttpStatus.BAD_REQUEST)
  @HttpCode(HttpStatus.OK)
  @Get('me/follows/*/posts')
  @Auth()
  async getMyFollowingPosts(
    @CurrentUser() member: MemberEntity,
    @Query(new QueryTransformPipe()) paginationQuery: PaginationQueryDto,
    @Query(new SortQueryPipe(['createDate']))
    sortQuery?: EntitySortQueryDto,
  ): Promise<PaginationResponseDto<PostDto>> {
    return this.memberFollowingPostService.getMemberFollowingPosts(
      member,
      paginationQuery,
      sortQuery,
    );
  }
}
