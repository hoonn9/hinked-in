import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMemberBodyDto {
  @ApiProperty({
    name: 'email',
    example: 'example@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'password',
  })
  @IsString()
  @Length(8)
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
