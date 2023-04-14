import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateColumnEntity } from '../../common/entity/date-column.entity';
import { MemberConstructorParams } from '../typing/member.type';
import { genUUID } from '../../common/lib/uuid';
import { ExperienceEntity } from '../../experience/entity/experience.entity';
import { ApiEmailProperty } from '../../common/lib/swagger/api-email-property.decorator';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsPassword } from '../../common/decorator/validate-decorator/is-password.decorator';
import { ApiUUIDProperty } from '../../common/lib/swagger/api-uuid-property.decorator';

@Entity({
  name: 'member',
})
export class MemberEntity extends DateColumnEntity {
  @ApiUUIDProperty()
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    primaryKeyConstraintName: 'member_pkey',
  })
  readonly id: string = genUUID();

  @ApiEmailProperty({
    name: 'email',
    type: String,
    example: 'example@email.com',
  })
  @IsEmail()
  @Index('member_ix_email', { unique: true })
  @Column({ type: 'varchar', name: 'email', length: 320 })
  email: string;

  @ApiPropertyOptional({
    name: 'lastName',
    type: String,
  })
  @IsOptional()
  @IsString()
  @Length(1, 30)
  @Column({
    type: 'varchar',
    name: 'last_name',
    length: 30,
    nullable: true,
  })
  lastName: string | null;

  @ApiPropertyOptional({
    name: 'firstName',
    type: String,
  })
  @IsOptional()
  @IsString()
  @Length(1, 30)
  @Column({
    type: 'varchar',
    name: 'first_name',
    length: 30,
    nullable: true,
  })
  firstName: string | null;

  @IsOptional()
  @IsPassword()
  @Column({ type: 'varchar', name: 'password', nullable: true })
  password: string | null;

  @Column({
    type: 'varchar',
    name: 'phone_number',
    length: 30,
    nullable: true,
  })
  phoneNumber: string | null;

  @OneToMany(() => ExperienceEntity, (experience) => experience.member)
  experiences: ExperienceEntity[] | null;

  static new(params: MemberConstructorParams) {
    const member = new MemberEntity();

    member.email = params.email;
    member.lastName = params.lastName || null;
    member.firstName = params.firstName || null;
    member.password = params.password || null;
    member.phoneNumber = params.phoneNumber || null;

    return member;
  }
}
