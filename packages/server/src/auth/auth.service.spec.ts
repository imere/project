import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { User, UserSchema } from '../schema/user';
import env from '../util/env';
import { AuthService } from './auth.service';
import { JwtStrategy } from './methods/jwt.strategy';
import { PasswordStrategy } from './methods/password.strategy';
import { SessionSerializer } from './methods/session.serializer';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PasswordStrategy, JwtStrategy, SessionSerializer],
      imports: [
        MongooseModule.forRoot(env.DB_MONGO, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
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
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
