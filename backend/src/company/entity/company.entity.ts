import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DateColumnEntity } from '../../common/entity/date-column.entity';
import { ApiUUIDProperty } from '../../common/lib/swagger/decorator/api-uuid-property.decorator';
import { genUUID } from '../../common/lib/uuid';
import { IsID } from '../../common/decorator/validate-decorator/is-id.decorator';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'company' })
export class CompanyEntity extends DateColumnEntity {
  @ApiUUIDProperty()
  @IsID()
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'company_pkey',
  })
  readonly id: string = genUUID();

  @ApiProperty({
    name: 'name',
    type: String,
  })
  @IsString()
  @Column({ name: 'name', type: 'varchar', length: 300 })
  name: string;
}
