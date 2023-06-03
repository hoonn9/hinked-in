import { ApiTags } from '@nestjs/swagger';
import { UseController } from '../common/decorator/use-controller.decorator';
import { PostService } from './post.service';
import { Body, Post } from '@nestjs/common';
import { TransactionContext } from '../common/decorator/transaction-manager.decorator';
import { TransactionRoute } from '../common/decorator/transaction-route.decorator';
import { Auth } from '../auth/decorator/auth.decorator';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { MemberEntity } from '../member/entity/member.entity';
import { TransactionManager } from '../common/type/transaction-manager.type';
import { CreateMemberPostBodyDto } from './dto/create-member-post.dto';

@ApiTags('post')
@UseController('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

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
