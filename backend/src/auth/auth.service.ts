import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Member } from '../member/entity/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { authMessages } from './auth.constant';
import { CryptoService } from '../crypto/crypto.service';

@Injectable()
export class AuthService {
  private readonly loginFailException = new UnauthorizedException(
    authMessages.loginFail,
  );

  constructor(
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService,

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

  private async localLogin(
    member: Member,
    passwordInput: string,
  ): Promise<Member> {
    if (!this.hasPasswordMember(member)) {
      throw this.loginFailException;
    }

    if (!(await this.comparePassword(member, passwordInput))) {
      throw this.loginFailException;
    }

    return member;
  }

  private async comparePassword(
    member: Member & { password: string },
    passwordInput: string,
  ): Promise<boolean> {
    return this.cryptoService.comparePassword(passwordInput, member.password);
  }

  private hasPasswordMember(
    member: Member,
  ): member is Member & { password: string } {
    return member.password != null;
  }
}
