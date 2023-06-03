import { DateColumnDto } from '../../common/dto/date-columns.dto';
import { ApiUUIDProperty } from '../../common/lib/swagger/decorator/api-uuid-property.decorator';
import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
}
