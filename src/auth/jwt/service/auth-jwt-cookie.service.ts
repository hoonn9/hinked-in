import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthJwtGeneratorService } from './auth-jwt-generator.service';
import { MemberEntity } from '../../../member/entity/member.entity';
import { CookieService } from '../../../common/service/cookie.service';
import { Response } from 'express';

@Injectable()
export class AuthJwtCookieService {
  private readonly JWT_ACCESS_TOKEN_NAME: string;
  private readonly JWT_REFRESH_TOKEN_NAME: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtGeneratorService: AuthJwtGeneratorService,
    private readonly cookieService: CookieService,
  ) {
    this.JWT_ACCESS_TOKEN_NAME = this.configService.getOrThrow(
      'JWT_ACCESS_TOKEN_NAME',
    );

    this.JWT_REFRESH_TOKEN_NAME = this.configService.getOrThrow(
      'JWT_REFRESH_TOKEN_NAME',
    );
  }

  login(response: Response, member: MemberEntity): void {
    this.setNewTokens(response, member);
  }

  refresh(response: Response, member: MemberEntity): void {
    this.setNewTokens(response, member);
  }

  private setNewTokens(response: Response, member: MemberEntity): void {
    const jwtPayload = this.jwtGeneratorService.makeMemberPayload(member);

    this.cookieService.setCookie(
      response,
      this.JWT_ACCESS_TOKEN_NAME,
      this.jwtGeneratorService.generateAccessToken(jwtPayload),
    );

    this.cookieService.setCookie(
      response,
      this.JWT_REFRESH_TOKEN_NAME,
      this.jwtGeneratorService.generateRefreshToken(jwtPayload),
    );
  }
}
