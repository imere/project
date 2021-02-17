export interface CreateUser {
  username: string;

  password: string;
}

export type FindUser = CreateUser;

export type LoginUser = CreateUser;
