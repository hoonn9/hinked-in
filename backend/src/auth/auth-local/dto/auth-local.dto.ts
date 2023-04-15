import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsPassword } from '../../../common/decorator/validate-decorator/is-password.decorator';

export class AuthLocalBodyDto {
  @ApiProperty({
    example: 'example@email.com',
    name: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'password',
  })
  @IsPassword()
  password: string;
}
