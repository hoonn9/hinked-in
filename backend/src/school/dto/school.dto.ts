import { DateColumnDto } from '../../common/dto/date-columns.dto';
import { ApiUUIDProperty } from '../../common/lib/swagger/decorator/api-uuid-property.decorator';
import { IsID } from '../../common/decorator/validate-decorator/is-id.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { SchoolEntity } from '../entity/school.entity';
import { plainToInstance } from 'class-transformer';

export class SchoolDto extends DateColumnDto {
  @ApiUUIDProperty({
    name: 'id',
  })
  @IsID()
  id: string;

  @ApiProperty({
    name: 'name',
    type: String,
  })
  @IsString()
  name: string;

  static fromEntity(entity: SchoolEntity) {
    const plain: SchoolDto = {
      id: entity.id,
      name: entity.name,
      createDate: entity.createDate,
      updateDate: entity.updateDate,
    };

    return plainToInstance(SchoolDto, plain);
  }
}
