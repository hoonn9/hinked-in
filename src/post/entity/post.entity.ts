import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateColumnEntity } from '../../common/entity/date-column.entity';
import { genUUID } from '../../common/lib/uuid';
import { PostAuthorType, PostConstructorParam } from '../typing/post.type';

@Entity({
  name: 'post',
})
export class PostEntity extends DateColumnEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'post_pkey',
  })
  readonly id: string = genUUID();

  @Column({ type: 'text', name: 'content' })
  content: string;

  @Column({ type: 'varchar', length: 16, name: 'author_type' })
  authorType: PostAuthorType;

  @Column({ type: 'uuid', name: 'authorId' })
  authorId: string;

  static new(params: PostConstructorParam) {
    const postEntity = new PostEntity();

    postEntity.authorId = params.authorId;
    postEntity.authorType = params.authorType;
    postEntity.content = params.content;

    return postEntity;
  }
}
