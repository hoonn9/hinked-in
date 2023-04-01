import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MemberEntity } from '../../../member/entity/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from '../type/auth-jwt.type';

@Injectable()
export class AuthJwtValidateService {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly memberRepository: Repository<MemberEntity>,
  ) {}

  async validate(payload: JwtPayload): Promise<MemberEntity> {
    const member = await this.memberRepository.findOne({
      where: {
        id: payload.id,
      },
    });

    if (member === null) {
      throw new UnauthorizedException();
    }

    return member;
  }
}
