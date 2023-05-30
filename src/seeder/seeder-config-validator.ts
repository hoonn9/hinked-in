import { plainToInstance } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';
import { IsPortNumber } from '../common/decorator/validate-decorator/is-port-number.decorator';

class SeederEnvironmentVariables {
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
}

export function validateSeederConfig(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(SeederEnvironmentVariables, config, {
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
