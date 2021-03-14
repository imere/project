import { User } from '../schema/user';
import { Session, SessionData } from 'express-session';

declare module 'express' {
  interface Request {
    user: {
      _id: string,
    } & User
    session?: Session & Partial<SessionData> & {
        username?: string
    }
  }
}
