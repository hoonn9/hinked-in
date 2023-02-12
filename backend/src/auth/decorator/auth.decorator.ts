import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from '../jwt/guard/auth-access.guard';

export const Auth = () => applyDecorators(UseGuards(JwtAccessGuard));
