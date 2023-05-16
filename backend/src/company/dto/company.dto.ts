import { ApiUUIDProperty } from '../../common/lib/swagger/decorator/api-uuid-property.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { DateColumnDto } from '../../common/dto/date-columns.dto';
import { CompanyEntity } from '../entity/company.entity';
import { plainToInstance } from 'class-transformer';
import { IsID } from '../../common/decorator/validate-decorator/is-id.decorator';
import { IsString } from 'class-validator';

export class CompanyDto extends DateColumnDto {
  @ApiUUIDProperty()
  @IsID()
  id: string;

  @ApiProperty({
    name: 'name',
    type: String,
  })
  @IsString()
  name: string;

  static fromEntity(entity: CompanyEntity) {
    const plain: CompanyDto = {
      id: entity.id,
      name: entity.name,
      createDate: entity.createDate,
      updateDate: entity.updateDate,
    };

    return plainToInstance(CompanyDto, plain);
  }
}
