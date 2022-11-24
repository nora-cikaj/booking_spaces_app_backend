/* eslint-disable import/prefer-default-export */
import Joi from 'joi';
import { BadRequest } from '../../utils/errors';
import { CreateUserRequestBody } from './user.types';

export const validateCreateUserRequest = ({
  requestBody,
}: {
  requestBody: CreateUserRequestBody;
}): CreateUserRequestBody => {
  const schema = Joi.object()
    .keys({
      id: Joi.string().required(),
      name: Joi.string().trim(true),
      lastName: Joi.string().trim(true),
      email: Joi.string().email().required(),
      avatarUrl: Joi.string(),
      myEvents: Joi.array().items(Joi.string()),
    })
    .required();

  const result = schema.validate(requestBody);
  if (result.error) {
    throw new BadRequest(result.error.details);
  }
  return result.value;
};
