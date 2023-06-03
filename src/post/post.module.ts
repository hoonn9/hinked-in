import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entity/post.entity';
import { TypeOrmCustomModule } from '../database/typeorm/typeorm-custom.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './repository/post.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    TypeOrmCustomModule.forCustomRepository([PostRepository]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
