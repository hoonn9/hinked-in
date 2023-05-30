import { Type } from 'class-transformer';
import { ApiDateProperty } from '../lib/swagger/decorator/api-date-property.decorator';
import { IsDate } from 'class-validator';

export class DateColumnDto {
  @ApiDateProperty({
    name: 'createDate',
    description: '생성된 시간입니다.',
  })
  @IsDate()
  @Type(() => Date)
  createDate: Date;

  @ApiDateProperty({
    name: 'updateDate',
    description: '데이터가 갱신된 시간입니다.',
  })
  @IsDate()
  @Type(() => Date)
  updateDate: Date;
}
