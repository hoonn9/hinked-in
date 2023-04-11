import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { setJwtSecuritySwaggerDocument } from '../../../auth/jwt/lib/set-swagger-document';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';

export const setupSwagger = (
  app: INestApplication,
  configService: ConfigService,
) => {
  const documentBuilder = new DocumentBuilder()
    .setTitle(configService.get('SWAGGER_API_TITLE', 'HinkedIn API Docs'))
    .setDescription(
      configService.get(
        'SWAGGER_API_DESCRIPTION',
        'HinkedIn service API description',
      ),
    )
    .setVersion(configService.getOrThrow('SWAGGER_API_VERSION'));

  setJwtSecuritySwaggerDocument(documentBuilder, {
    accessTokenName: configService.getOrThrow('JWT_ACCESS_TOKEN_NAME'),
    refreshTokenName: configService.getOrThrow('JWT_REFRESH_TOKEN_NAME'),
  });

  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerModule.setup(
    configService.getOrThrow('SWAGGER_API_PATH'),
    app,
    document,
  );
};
