import { pick } from '@packages/shared/util/object';
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform<T>(value: T, { metatype }: ArgumentMetadata): Promise<T> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: false,
      validationError: {
        target: false,
      },
    });
    if (errors.length > 0) {
      throw new BadRequestException(
        JSON.stringify(errors.map(error => pick(error, ['property', 'constraints'])))
      );
    }
    return value;
  }

  private toValidate(metatype: ArgumentMetadata['metatype']): boolean {
    const types: ArgumentMetadata['metatype'][] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
