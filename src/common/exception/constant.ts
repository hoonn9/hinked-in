import { HttpStatus } from '@nestjs/common';

export interface ExceptionResponseConstant {
  statusCode: HttpStatus;
  code: string;
  message: string;
}

export const EXCEPTION_RESPONSE = {
  // Common
  InvalidInputValue: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: 'C001',
    message: '올바르지 않은 요청입니다.',
  },
  EntityNotExist: {
    statusCode: HttpStatus.NOT_FOUND,
    code: 'C002',
    message: '존재하지 않는 데이터입니다.',
  },
  AlreadyExists: {
    statusCode: HttpStatus.CONFLICT,
    code: 'C003',
    message: '이미 존재하는 데이터입니다.',
  },
  Uncaught: {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    code: 'C004',
    message: '서버에서 처리할 수 없는 요청입니다.',
  },

  // Auth
  LoginFail: {
    statusCode: HttpStatus.UNAUTHORIZED,
    code: 'A001',
    message: '사용자의 이메일 또는 비밀번호가 올바르지 않습니다.',
  },
  LoginNeed: {
    statusCode: HttpStatus.UNAUTHORIZED,
    code: 'A002',
    message: '로그인이 필요합니다. 로그인 후 이용하세요.',
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
