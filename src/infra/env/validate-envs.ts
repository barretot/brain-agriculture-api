import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

import { Env } from './env';

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(Env, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const missingOrInvalidVars = errors
      .map((error) => error.property)
      .join(', ');

    throw new Error(
      `Missing or malformatted environment variables: ${missingOrInvalidVars}`,
    );
  }

  return validatedConfig;
}
