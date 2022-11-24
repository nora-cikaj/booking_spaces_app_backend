export type CreateUserRequestBody = {
  id: string;
  name?: string;
  lastName?: string;
  email: string;
  avatarUrl?: string;
  myEvents: string[];
};

export type UpdateUserRequestBody = {
  id: string;
  email: string;
  name: string;
  lastName: string;
  avatarUrl: string;
  myEvents: string[];
};
