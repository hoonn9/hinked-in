import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';
import { MemberDto } from './member.dto';
import { ExperienceDto } from '../../experience/dto/experience.dto';
import { plainToInstance } from 'class-transformer';
import { MemberEntity } from '../entity/member.entity';

export class GetMeMemberDto extends OmitType(MemberDto, ['phoneNumber']) {
  @IsPhoneNumber('KR')
  @ApiPropertyOptional({
    name: 'phoneNumber',
    type: String,
  })
  phoneNumber: string | null;

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

    return plainToInstance(GetMeMemberDto, plain);
  }
}
