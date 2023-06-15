import { plainToInstance } from 'class-transformer';
import { IsInt, IsOptional, IsString, validateSync } from 'class-validator';
import { IsPortNumber } from '../decorator/validate-decorator/is-port-number.decorator';

class EnvironmentVariables {
  @IsPortNumber()
  PORT: number;

  @IsString()
  DATABASE_HOST: string;

  @IsPortNumber()
  DATABASE_PORT: number;

  @IsString()
  DATABASE_USERNAME: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsString()
  DATABASE_NAME: string;

  @IsInt()
  SALT_ROUNDS: number;

  @IsString()
  FACEBOOK_APP_ID: string;

  @IsString()
  FACEBOOK_APP_SECRET: string;

  @IsString()
  GOOGLE_CLIENT_ID: string;

  @IsString()
  GOOGLE_CLIENT_SECRET: string;

  @IsString()
  JWT_ACCESS_TOKEN_SECRET_KEY: string;

  @IsString()
  JWT_ACCESS_TOKEN_EXPIRES_IN: string;

  @IsString()
  JWT_ACCESS_TOKEN_NAME: string;

  @IsString()
  JWT_REFRESH_TOKEN_SECRET_KEY: string;

  @IsString()
  JWT_REFRESH_TOKEN_EXPIRES_IN: string;

  @IsString()
  JWT_REFRESH_TOKEN_NAME: string;

  @IsString()
  SWAGGER_API_PATH: string;

  @IsString()
  @IsOptional()
  SWAGGER_API_TITLE?: string;

  @IsString()
  @IsOptional()
  SWAGGER_API_DESCRIPTION?: string;

  @IsString()
  SWAGGER_API_VERSION: string;

  @IsString()
  LOGGING_ERROR_FILE_PATH: string;

  @IsString()
  LOGGING_ALL_FILE_PATH: string;
}

export function validateConfig(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
