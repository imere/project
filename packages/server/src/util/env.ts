import * as path from 'path';

const {
  HOST,
  PORT,
  DB_MONGO,
  SESSION_REDIS_HOST,
  SESSION_REDIS_PORT,
} = process.env;

export default {
  HOST: HOST ?? '0.0.0.0',
  PORT: PORT ? Number(PORT) : 3000,
  DB_MONGO: DB_MONGO ?? 'mongodb://127.0.0.1:27017/blog',
  auth: {
    secret: {
      jwt: 'jwtsecret',
      session: 'cab98d7bfca9e7bed09aef',
      passphrase: 'top secret',
    },
    rsa: {
      path: {
        public: path.join(__dirname, '..', 'pubKey.pem'),
        private: path.join(__dirname, '..', 'priKey.pem'),
      },
    },
  },
  session: {
    redis: {
      HOST: SESSION_REDIS_HOST ?? '127.0.0.1',
      PORT: SESSION_REDIS_PORT ? Number(SESSION_REDIS_PORT) : 6379,
    },
  },
};
