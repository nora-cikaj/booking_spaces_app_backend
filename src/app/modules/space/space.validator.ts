import Joi from 'joi';
import { getSpace } from './space.dal';
import { BadRequest, UnprocessableEntity } from '../../utils/errors';
import { CreateSpaceRequestBody, UpdateSpaceRequestBody } from './space.types';
import errors from '../../constants/errors';

export const validateCreateSpaceRequest = ({ requestBody }): CreateSpaceRequestBody => {
  const schema = Joi.object().keys({
    name: Joi.string().required().trim(true),
    capacity: Joi.number().required().min(1),
    minCapacity: Joi.number().min(1).max(requestBody.capacity),
    timeRestrinction: Joi.number(),
  }).required();

  const result = schema.validate(requestBody);

  if (result.error) {
    throw new BadRequest(result.error.message);
  }

  return result.value;
};

export const validateDublicateSpaces = async ({ spaceName }): Promise<void> => {
  const query = {
    name: spaceName,
  };

  const existingSpace = await getSpace({ query });
  if (existingSpace) {
    throw new UnprocessableEntity(errors.SPACE.DOUBLE_SPACE);
  }
};

export const validateUpdateSpaceRequest = ({ requestBody }): UpdateSpaceRequestBody => {
  const schema = Joi.object().keys({
    name: Joi.string().trim(true),
    capacity: Joi.number().min(1),
    minCapacity: Joi.number().min(1),
    timeRestrinction: Joi.number(),
  }).required().min(1);

  const result = schema.validate(requestBody);

  if (result.error) {
    throw new BadRequest(result.error.message);
  }

  return result.value;
};
