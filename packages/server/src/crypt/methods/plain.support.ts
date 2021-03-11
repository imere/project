import { EncType } from '@packages/shared/design/types/encryption';
import { Injectable } from '@nestjs/common';
import { ICrypt, CheckImplements } from './interface';

@Injectable()
@CheckImplements<ICrypt>()
export class Plain {
  static type = EncType.PLAIN

  enc(val: string): string {
    return val;
  }

  dec(val: string): string {
    return val;
  }
}
