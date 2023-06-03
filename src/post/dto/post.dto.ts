import { DateColumnDto } from '../../common/dto/date-columns.dto';
import { ApiUUIDProperty } from '../../common/lib/swagger/decorator/api-uuid-property.decorator';
import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PostEntity } from '../entity/post.entity';
import { plainToInstance } from 'class-transformer';

export class PostDto extends DateColumnDto {
  @ApiUUIDProperty()
  @IsUUID()
  id: string;

  @ApiProperty({
    name: 'content',
    type: String,
  })
  @IsString()
  content: string;

  static fromEntity(entity: PostEntity) {
    const plain: PostDto = {
      id: entity.id,
      content: entity.content,
      createDate: entity.createDate,
      updateDate: entity.updateDate,
    };

    return plainToInstance(PostDto, plain);
  }
}
