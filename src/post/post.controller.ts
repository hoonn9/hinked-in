import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UseController } from '../common/decorator/use-controller.decorator';
import { PostService } from './post.service';
import { Body, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { TransactionContext } from '../common/decorator/transaction-manager.decorator';
import { TransactionRoute } from '../common/decorator/transaction-route.decorator';
import { Auth } from '../auth/decorator/auth.decorator';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { MemberEntity } from '../member/entity/member.entity';
import { TransactionManager } from '../common/type/transaction-manager.type';
import { CreateMemberPostBodyDto } from './dto/create-member-post.dto';
import { ApiHttpResponse } from '../common/lib/swagger/decorator/api-http-response.decorator';
import { ApiHttpExceptionResponse } from '../common/lib/swagger/decorator/api-http-exception-response.decorator';

@ApiTags('posts')
@UseController('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

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
  @Post()
  async addMemberPost(
    @CurrentUser() member: MemberEntity,
    @TransactionContext() manager: TransactionManager,
    @Body() body: CreateMemberPostBodyDto,
  ): Promise<true> {
    await this.postService.addMemberPost(body, member, manager);
    return true;
  }
}
