import { Request } from 'express';

export type User = {
  displayName?: string,
  id: string,
  name?: string,
  lastName?: string,
  email: string,
  avatarUrl?: string,
  admin: boolean,
}

export interface CustomRequest extends Request {
  user: User,
  session: any,
  logout: any,
}
