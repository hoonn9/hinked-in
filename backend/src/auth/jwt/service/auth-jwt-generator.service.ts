import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../type/auth-jwt.type';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { MemberEntity } from '../../../member/entity/member.entity';

@Injectable()
export class AuthJwtGeneratorService {
  private accessJwtOptions: JwtSignOptions = {};
  private refreshJwtOptions: JwtSignOptions = {};

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.accessJwtOptions.secret = this.configService.getOrThrow(
      'JWT_ACCESS_TOKEN_SECRET_KEY',
    );
    this.accessJwtOptions.expiresIn = this.configService.getOrThrow(
      'JWT_ACCESS_TOKEN_EXPIRES_IN',
    );

    this.refreshJwtOptions.secret = this.configService.getOrThrow(
      'JWT_REFRESH_TOKEN_SECRET_KEY',
    );
    this.refreshJwtOptions.expiresIn = this.configService.getOrThrow(
      'JWT_REFRESH_TOKEN_EXPIRES_IN',
    );
  }

  generateAccessToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.accessJwtOptions.secret,
      expiresIn: this.accessJwtOptions.expiresIn,
    });
  }

  generateRefreshToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.refreshJwtOptions.secret,
      expiresIn: this.refreshJwtOptions.expiresIn,
    });
  }

  makeMemberPayload(member: MemberEntity): JwtPayload {
    return {
      id: member.id,
    };
  }
}
