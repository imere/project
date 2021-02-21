import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { CryptModule } from '../crypt/crypt.module';
import env from '../util/env';
import { PassportModule } from '@nestjs/passport';
import { PasswordStrategy } from './methods/password.strategy';
import { JwtStrategy } from './methods/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User,
  UserSchema,
} from '../schema/user';
import { AuthController } from './auth.controller';
import { SessionSerializer } from './methods/session.serializer';

@Module({
  providers: [AuthService, PasswordStrategy, JwtStrategy, SessionSerializer],
  exports: [AuthService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CryptModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: env.auth.secret.jwt,
          signOptions: {
            expiresIn: '30m',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
