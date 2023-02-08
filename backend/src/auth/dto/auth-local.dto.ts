import { IsEmail, IsString, Length } from 'class-validator';
import { authMessages } from '../auth.constant';
import { ApiProperty } from '@nestjs/swagger';

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
  @IsString()
  @Length(8, undefined, {
    message: authMessages.loginFail,
  })
  password: string;
}
