export interface UserPayload {
  username: string
  lastLogin: number
}

export interface JwtTokenPayload {
  access_token: string
}
