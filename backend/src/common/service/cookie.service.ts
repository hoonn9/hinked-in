import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CookieOptions, Response } from 'express';

@Injectable()
export class CookieService {
  constructor(private readonly configService: ConfigService) {}

  private getCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    };
  }

  setCookie(
    response: Response,
    name: string,
    value: string,
    options?: CookieOptions,
  ) {
    response.cookie(name, value, options || this.getCookieOptions());
  }
}
