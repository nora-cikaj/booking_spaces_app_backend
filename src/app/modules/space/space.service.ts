import * as dal from './space.dal';
import {
  validateCreateSpaceRequest,
  validateDublicateSpaces,
  validateUpdateSpaceRequest,
} from './space.validator';
import { Space, CreateSpaceRequestBody, UpdateSpaceRequestBody } from './space.types';
import { User } from '../../types/express';
import { NotFound } from '../../utils/errors';
import errors from '../../constants/errors';

export const createSpace = async (
  { requestBody, user }: { requestBody: CreateSpaceRequestBody, user: User },
): Promise<Space> => {
  const requestData = validateCreateSpaceRequest({ requestBody });
  await validateDublicateSpaces({ spaceName: requestData.name });

  const data = {
    ...requestData,
    createdBy: user.id,
  };

  const response: Space = await dal.createSpace({ data });
  return response;
};

export const getSpace = async (
  { id }: { id: number },
): Promise<Space> => {
  const query = {
    id,
  };

  const space = await dal.getSpace({ query });
  if (!space) {
    throw new NotFound(errors.SPACE.NOT_FOUND);
  }

  return space;
};

export const listSpaces = async (): Promise<Space[]> => {
  const spaces = await dal.listSpaces();
  return spaces;
};

export const updateSpace = async (
  { id, requestBody }: { id: number, requestBody: UpdateSpaceRequestBody },
): Promise<Space> => {
  await getSpace({ id });

  const query = {
    id,
  };

  const data = validateUpdateSpaceRequest({ requestBody });

  if (data.name) {
    await validateDublicateSpaces({ spaceName: data.name });
  }

  const updatedSpace = await dal.updateSpace({ query, data });
  return updatedSpace;
};

export const deleteSpace = async ({ id }: { id: number }): Promise<void> => {
  await getSpace({ id });

  const query = {
    id,
  };

  await dal.deleteSpace({ query });
};
