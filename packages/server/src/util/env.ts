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
  session: {
    redis: {
      HOST: SESSION_REDIS_HOST ?? '127.0.0.1',
      PORT: SESSION_REDIS_PORT ? Number(SESSION_REDIS_PORT) : 6379,
    },
  },
};
