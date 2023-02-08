import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMemberBodyDto {
  @ApiProperty({
    name: 'email',
    example: 'example@email.com',
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    name: 'password',
  })
  @IsString()
  @IsOptional()
  @Length(8)
  password?: string;
}
