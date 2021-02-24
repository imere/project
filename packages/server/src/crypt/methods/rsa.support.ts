import { EncType } from '@packages/shared/design/types/encryption';
import { Injectable } from '@nestjs/common';
import {
  ICrypt,
  CheckImplements,
} from './interface';
import crypto from 'crypto';
import * as fs from 'fs';
import env from '@packages/server/util/env';

@Injectable()
@CheckImplements<ICrypt>()
export class RSA {
  static type = EncType.RSA

  pubKey!: string

  priKey!: string

  passphrase = env.auth.secret.passphrase

  constructor() {
    this.init();
  }

  init(): void {
    const pubKeyPath = env.auth.rsa.path.public;
    const priKeyPath = env.auth.rsa.path.private;

    let publicKey, privateKey;

    if (!fs.existsSync(pubKeyPath) && !fs.existsSync(priKeyPath)) {
      console.warn('Creating new PEM at:');

      const res = crypto.generateKeyPairSync('rsa', {
        modulusLength: 1024,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
          cipher: 'aes-256-cbc',
          passphrase: this.passphrase,
        },
      });

      publicKey = res.publicKey as unknown as string;
      privateKey = res.privateKey as unknown as string;

      fs.writeFileSync(pubKeyPath, publicKey, { encoding: 'utf-8' });
      fs.writeFileSync(priKeyPath, privateKey, { encoding: 'utf-8' });
    } else {
      console.warn('Using existing PEM at');
    }
    console.warn(pubKeyPath);
    console.warn(priKeyPath);

    this.pubKey = publicKey ?? fs.readFileSync(pubKeyPath, { encoding: 'utf-8' });
    this.priKey = privateKey ?? fs.readFileSync(priKeyPath, { encoding: 'utf-8' });
  }

  /**
   * @param {string} val utf-8
   * @returns {string} base64
   * @memberof RSA
   */
  enc(val: string): string {
    return crypto
      .publicEncrypt(this.pubKey, Buffer.from(val, 'utf-8'))
      .toString('base64');
  }

  /**
   * @param {string} val base64
   * @returns {string} utf-8
   * @memberof RSA
   */
  dec(val: string): string {
    return crypto
      .privateDecrypt(
        { key: this.priKey, passphrase: this.passphrase },
        Buffer.from(val, 'base64')
      )
      .toString('utf-8');
  }
}
