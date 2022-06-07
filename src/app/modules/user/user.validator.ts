/* eslint-disable import/prefer-default-export */
import Joi from 'joi';
import { BadRequest } from '../../utils/errors';
import { CreateUserRequestBody } from './user.types';

export const validateCreateUserRequest = (
  { requestBody }: { requestBody: CreateUserRequestBody },
): CreateUserRequestBody => {
  const schema = Joi.object().keys({
    id: Joi.string().required().trim(true),
    name: Joi.string().trim(true),
    lastName: Joi.string().trim(true),
    email: Joi.string().required().trim(true).lowercase(),
    avatarUrl: Joi.string(),
  }).required();

  const result = schema.validate(requestBody);
  if (result.error) {
    throw new BadRequest(result.error.details);
  }
  return result.value;
};
