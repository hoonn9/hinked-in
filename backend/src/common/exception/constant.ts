import { HttpStatus } from '@nestjs/common';

export const EXCEPTION_RESPONSE = {
  // Common
  InvalidInputValue: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: 'C001',
    message: '올바르지 않은 요청입니다.',
  },

  // Member
  MemberNotExist: {
    statusCode: HttpStatus.NOT_FOUND,
    code: 'M001',
    message: '존재하지 않는 사용자입니다.',
  },
  MemberAlreadyExists: {
    statusCode: HttpStatus.CONFLICT,
    code: 'M002',
    message: '이미 존재하는 사용자입니다.',
  },
} as const;
