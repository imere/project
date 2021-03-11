import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { CryptModule } from '../crypt/crypt.module';
import { User, UserSchema } from '../schema/user';
import env from '../util/env';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './methods/jwt.strategy';
import { PasswordStrategy } from './methods/password.strategy';
import { SessionSerializer } from './methods/session.serializer';
import { JwtModule } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PasswordStrategy, JwtStrategy, SessionSerializer],
      exports: [AuthService],
      imports: [
        MongooseModule.forRoot(env.DB_MONGO, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        }),
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
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
