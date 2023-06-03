import { Injectable } from '@nestjs/common';
import { PostRepository } from './repository/post.repository';
import { MemberEntity } from '../member/entity/member.entity';
import { CreateMemberPostBodyDto } from './dto/create-member-post.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async addMemberPost(
    body: CreateMemberPostBodyDto,
    member: MemberEntity,
    manager: EntityManager,
  ) {
    await this.postRepository.createMemberPost(body.content, member, manager);
  }
}
