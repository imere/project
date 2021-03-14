import { EncType } from '@package/shared/src/design/types/encryption';
import { RSA } from './methods/rsa.support';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CryptService {
  constructor(@Inject(EncType.RSA) private readonly rsa: RSA) {}

  encPassword(val: string): string {
    return this.rsa.enc(val);
  }

  decPassword(val: string): string {
    return this.rsa.dec(val);
  }
}
