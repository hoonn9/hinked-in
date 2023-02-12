import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Member } from '../../member/entity/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoService } from '../../crypto/crypto.service';
import { AUTH_EXCEPTION_MESSAGES } from '../constant/auth-exception-message';

@Injectable()
export class AuthLocalValidateService {
  private readonly loginFailException = new UnauthorizedException(
    AUTH_EXCEPTION_MESSAGES.loginFail,
  );

  constructor(
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
