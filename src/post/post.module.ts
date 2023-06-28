import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entity/post.entity';
import { TypeOrmCustomModule } from '../database/typeorm/typeorm-custom.module';
import { PostService } from './post.service';
import { PostRepository } from './repository/post.repository';
import { PostPaginationService } from './service/post.pagination.service';
import { MemberPostController } from './controller/member-post.controller';
import { CompanyPostController } from './controller/company-post.controller';
import { CompanyPostService } from './service/company-post.service';
import { CompanyRepository } from '../company/repository/company.repository';
import { MemberFollowingPostController } from './controller/member-following-post.controller';
import { MemberFollowingPostService } from './service/member-following-post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    TypeOrmCustomModule.forCustomRepository([
      PostRepository,
      CompanyRepository,
    ]),
  ],
  controllers: [
    MemberPostController,
    CompanyPostController,
    MemberFollowingPostController,
  ],
  providers: [
    PostService,
    CompanyPostService,
    PostPaginationService,
    MemberFollowingPostService,
  ],
})
export class PostModule {}
