import { IsString, Length } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { MemberEntity } from '../entity/member.entity';
import { IsPassword } from '../../common/decorator/validate-decorator/is-password.decorator';
import { Column } from 'typeorm';

export class CreateMemberBodyDto extends PickType(MemberEntity, ['email']) {
  @ApiProperty({
    name: 'password',
    description:
      '최소 8자이며 최소 1개의 문자, 1개의 숫자 및 1개의 특수 문자를 포함해야 합니다.',
  })
  @IsPassword()
  @Column({ type: 'varchar', name: 'password', nullable: true })
  password: string;

  @ApiProperty({
    name: 'lastName',
  })
  @IsString()
  @Length(1, 30)
  lastName: string;

  @ApiProperty({
    name: 'firstName',
  })
  @IsString()
  @Length(1, 30)
  firstName: string;
}
