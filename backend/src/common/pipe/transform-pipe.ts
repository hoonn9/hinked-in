import { validateOrFail } from '../lib/validation';
import { validate } from 'class-validator';

export abstract class TransformPipe {
  async transformWithRequired<T extends object>(
    instance: T,
    required?: boolean,
  ) {
    if (required) {
      await validateOrFail(instance);
      return instance;
    }

    const errors = await validate(instance);

    if (errors.length) {
      return null;
    }

    return instance;
  }
}
