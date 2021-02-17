import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import env from './util/env';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../dist', 'client'),
    }),
    MongooseModule.forRoot(env.DB_MONGO, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }),
    UserModule,
    PostModule,
  ],
})
export class AppModule {}
