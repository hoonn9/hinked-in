import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MemberEntity } from '../../../member/entity/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoService } from '../../../crypto/crypto.service';
import { LoginFailException } from '../exception/login-fail.exception';

@Injectable()
export class AuthLocalValidateService {
  constructor(
    private readonly cryptoService: CryptoService,

    @InjectRepository(MemberEntity)
    private readonly memberRepository: Repository<MemberEntity>,
  ) {}

  async validateMember(
    email: string,
    passwordInput: string,
  ): Promise<MemberEntity> {
    const member = await this.memberRepository.findOne({
      where: {
        email,
      },
    });

    if (member === null) {
      throw new LoginFailException();
    }

    return this.localLogin(member, passwordInput);
  }

  private async localLogin(
    member: MemberEntity,
    passwordInput: string,
  ): Promise<MemberEntity> {
    if (!this.hasPasswordMember(member)) {
      throw new LoginFailException();
    }

    if (!(await this.comparePassword(member, passwordInput))) {
      throw new LoginFailException();
    }

    return member;
  }

  private async comparePassword(
    member: MemberEntity & { password: string },
    passwordInput: string,
  ): Promise<boolean> {
    return this.cryptoService.comparePassword(passwordInput, member.password);
  }

  private hasPasswordMember(
    member: MemberEntity,
  ): member is MemberEntity & { password: string } {
    return member.password != null;
  }
}
