import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entity/post.entity';
import { TypeOrmCustomModule } from '../database/typeorm/typeorm-custom.module';
import { PostService } from './post.service';
import { PostRepository } from './repository/post.repository';
import { PostPaginationService } from './service/post.pagination.service';
import { MemberPostController } from './controller/member-post.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    TypeOrmCustomModule.forCustomRepository([PostRepository]),
  ],
  controllers: [MemberPostController],
  providers: [PostService, PostPaginationService],
})
export class PostModule {}
