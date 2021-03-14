import { EncType } from '@package/shared/src/design/types/encryption';
import { Module } from '@nestjs/common';
import { CryptService } from './crypt.service';
import { RSA } from './methods/rsa.support';
import { Plain } from './methods/plain.support';

@Module({
  providers: [
    CryptService,
    {
      provide: EncType.PLAIN,
      useClass: Plain,
    },
    {
      provide: EncType.RSA,
      useClass: RSA,
    },
  ],
  exports: [CryptService],
})
export class CryptModule {}
