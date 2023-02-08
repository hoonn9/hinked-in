import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Member } from '../member/entity/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { authMessages } from './auth.constant';

@Injectable()
export class AuthService {
  private readonly loginFailException = new UnauthorizedException(
    authMessages.loginFail,
  );

  constructor(
    private readonly jwtService: JwtService,

    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async validateMember(email: string, passwordInput: string): Promise<Member> {
    const member = await this.memberRepository.findOne({
      where: {
        email,
      },
    });

    if (member === null) {
      throw this.loginFailException;
    }

    return this.localLogin(member, passwordInput);
  }

  private localLogin(member: Member, passwordInput: string): Member {
    this.canPasswordLogin(member);

    if (!this.comparePassword(member, passwordInput)) {
      throw this.loginFailException;
    }

    return member;
  }

  private comparePassword(member: Member, passwordInput: string): boolean {
    if (member.password === passwordInput) {
      return true;
    }
    return false;
  }

  private canPasswordLogin(member: Member): boolean {
    return member.password != null;
  }
}
