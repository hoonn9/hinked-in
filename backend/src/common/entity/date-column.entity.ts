import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class DateColumnEntity {
  @CreateDateColumn({
    type: 'timestamp with time zone',
    name: 'create_date',
  })
  readonly createDate: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    name: 'update_date',
  })
  updateDate: Date;

  @DeleteDateColumn({
    type: 'timestamp with time zone',
    name: 'delete_date',
  })
  deleteDate: Date | null;
}
