import { IsString, IsUUID } from 'class-validator';
import { ApiUUIDProperty } from '../../common/lib/swagger/decorator/api-uuid-property.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { IndustryEntity } from '../entity/industry.entity';

export class IndustryDto {
  @ApiUUIDProperty()
  @IsUUID()
  readonly id: string;

  @ApiProperty({
    name: 'name',
    type: String,
  })
  @IsString()
  name: string;

  static fromEntity(entity: IndustryEntity): IndustryDto {
    const plain: IndustryDto = {
      id: entity.id,
      name: entity.name,
    };

    return plainToInstance(IndustryDto, plain);
  }
}
