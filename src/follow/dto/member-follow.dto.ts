import { ApiUUIDProperty } from '../../common/lib/swagger/decorator/api-uuid-property.decorator';
import { IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MemberDto } from '../../member/dto/member.dto';
import { Type, plainToInstance } from 'class-transformer';
import { DateColumnDto } from '../../common/dto/date-columns.dto';
import { FollowEntity } from '../entity/follow.entity';
import { MemberEntity } from '../../member/entity/member.entity';

export class MemberFollowDto extends DateColumnDto {
  @ApiUUIDProperty()
  @IsUUID()
  id: string;

  @ApiPropertyOptional({
    name: 'follower',
    type: MemberDto,
  })
  @Type(() => MemberDto)
  follower: MemberDto;

  @ApiProperty({
    name: 'following',
    type: MemberDto,
  })
  @Type(() => MemberDto)
  following: MemberDto;

  static fromEntity(entity: FollowEntity, following: MemberEntity) {
    const plain: MemberFollowDto = {
      id: entity.id,
      follower: MemberDto.fromEntity(entity.follower),
      following: MemberDto.fromEntity(following),
      createDate: entity.createDate,
      updateDate: entity.updateDate,
    };

    return plainToInstance(MemberFollowDto, plain);
  }
}
