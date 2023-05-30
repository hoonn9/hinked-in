import { DocumentBuilder } from '@nestjs/swagger';

export const setJwtSecuritySwaggerDocument = (
  document: DocumentBuilder,
  jwtToken: { accessTokenName: string; refreshTokenName: string },
) => {
  document
    .addSecurityRequirements(jwtToken.accessTokenName)
    .addSecurityRequirements(jwtToken.refreshTokenName)
    .addCookieAuth(
      jwtToken.accessTokenName,
      {
        type: 'apiKey',
        in: 'cookie',
        description: '테스트할 사용자의 Access Token을 입력하세요.',
      },
      jwtToken.accessTokenName,
    )
    .addCookieAuth(
      jwtToken.refreshTokenName,
      {
        type: 'apiKey',
        in: 'cookie',
        description: '테스트할 사용자의 Refresh Token을 입력하세요.',
      },
      jwtToken.refreshTokenName,
    );

  return document;
};
