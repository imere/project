import { Test, TestingModule } from '@nestjs/testing';
import { CryptService } from './crypt.service';
import { EncType } from '@packages/shared/design/types/encryption';
import { Plain } from './methods/plain.support';
import { RSA } from './methods/rsa.support';

describe('CryptService', () => {
  let service: CryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    service = module.get<CryptService>(CryptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('rsa works', () => {
    const original = 'original';
    const decrypted = service.decPassword(service.encPassword(original));
    expect(original).toStrictEqual(decrypted);
  });
});
