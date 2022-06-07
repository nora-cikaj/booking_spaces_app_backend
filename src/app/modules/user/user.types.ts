export type CreateUserRequestBody = {
  id: string,
  name?: string,
  lastName?: string,
  email: string,
  avatarUrl?: string,
}

export type UpdateUserRequestBody = {
  name?: string,
  lastName?: string,
  avatarUrl?: string,
}
