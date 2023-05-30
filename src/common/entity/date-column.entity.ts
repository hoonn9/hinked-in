import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiDateProperty } from '../lib/swagger/decorator/api-date-property.decorator';

export abstract class DateColumnEntity {
  @ApiDateProperty({
    name: 'createDate',
    description: '생성된 시간입니다.',
  })
  @CreateDateColumn({
    type: 'timestamp with time zone',
    name: 'create_date',
    precision: 3,
  })
  readonly createDate: Date;

  @ApiDateProperty({
    name: 'updateDate',
    isOptional: true,
    description: '데이터가 갱신된 시간입니다.',
  })
  @UpdateDateColumn({
    type: 'timestamp with time zone',
    name: 'update_date',
    precision: 3,
  })
  updateDate: Date;

  @DeleteDateColumn({
    type: 'timestamp with time zone',
    name: 'delete_date',
    precision: 3,
  })
  deleteDate: Date | null = null;
}
