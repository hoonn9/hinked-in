import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AUTH_EXCEPTION_MESSAGES } from '../../constant/auth-exception-message';

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
    message: AUTH_EXCEPTION_MESSAGES.loginFail,
  })
  password: string;
}
