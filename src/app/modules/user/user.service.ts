import * as dal from './user.dal';
import { validateCreateUserRequest } from './user.validator';
import { CreateUserRequestBody } from './user.types';

export const upsertUser = async ({
  requestBody,
}: {
  requestBody: CreateUserRequestBody;
}) => {
  const data = validateCreateUserRequest({ requestBody });

  const query = {
    id: data.id,
  };

  const response = await dal.upsertUser({ query, requestBody });
  return response;
};
