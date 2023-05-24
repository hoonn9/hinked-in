import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiEmailProperty } from '../../common/lib/swagger/decorator/api-email-property.decorator';
import { ApiUUIDProperty } from '../../common/lib/swagger/decorator/api-uuid-property.decorator';
import { Exclude, Type, plainToInstance } from 'class-transformer';
import { ExperienceDto } from '../../experience/dto/experience.dto';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { IsID } from '../../common/decorator/validate-decorator/is-id.decorator';
import { MemberEntity } from '../entity/member.entity';
import { DateColumnDto } from '../../common/dto/date-columns.dto';

export class MemberDto extends DateColumnDto {
  @ApiUUIDProperty({
    name: 'id',
    description: '멤버 ID입니다.',
  })
  @IsID()
  id: string;

  @ApiEmailProperty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    name: 'lastName',
    type: String,
  })
  @IsOptional()
  @IsString()
  @Length(1, 30)
  lastName: string | null;

  @ApiPropertyOptional({
    name: 'firstName',
    type: String,
  })
  @IsOptional()
  @IsString()
  @Length(1, 30)
  firstName: string | null;

  @Exclude()
  @IsPhoneNumber('KR')
  @ApiPropertyOptional({
    name: 'phoneNumber',
    type: String,
  })
  phoneNumber: string | null;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  experiences?: ExperienceDto[] | null;

  static fromEntity(entity: MemberEntity) {
    const plain: MemberDto = {
      id: entity.id,
      email: entity.email,
      experiences: entity.experiences?.map(ExperienceDto.fromEntity),
      firstName: entity.firstName,
      lastName: entity.lastName,
      phoneNumber: entity.phoneNumber,
      createDate: entity.createDate,
      updateDate: entity.updateDate,
    };

    return plainToInstance(MemberDto, plain);
  }
}
