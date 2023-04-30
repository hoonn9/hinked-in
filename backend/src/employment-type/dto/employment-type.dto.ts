import { IsString, IsUUID } from 'class-validator';
import { ApiUUIDProperty } from '../../common/lib/swagger/decorator/api-uuid-property.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { EmploymentTypeEntity } from '../entity/employment-type.entity';
import { plainToInstance } from 'class-transformer';

export class EmploymentTypeDto {
  @ApiUUIDProperty()
  @IsUUID()
  readonly id: string;

  @ApiProperty({
    name: 'name',
    type: String,
  })
  @IsString()
  name: string;

  static fromEntity(entity: EmploymentTypeEntity): EmploymentTypeDto {
    const plain: EmploymentTypeDto = {
      id: entity.id,
      name: entity.name,
    };

    return plainToInstance(EmploymentTypeDto, plain);
  }
}
