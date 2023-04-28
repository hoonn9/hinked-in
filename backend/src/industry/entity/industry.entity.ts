import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { ApiUUIDProperty } from '../../common/lib/swagger/decorator/api-uuid-property.decorator';
import { IsID } from '../../common/decorator/validate-decorator/is-id.decorator';
import { genUUID } from '../../common/lib/uuid';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

@Entity({
  name: 'industry',
})
export class IndustryEntity {
  @ApiUUIDProperty()
  @IsID()
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'industry_pkey',
  })
  readonly id: string = genUUID();

  @ApiProperty({
    name: 'name',
  })
  @IsString()
  @Length(1, 100)
  @Index('industry_ix_name', {
    unique: true,
  })
  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;
}
