/* eslint-disable import/prefer-default-export */
import { calendar_v3 } from 'googleapis';
import Joi from 'joi';
import { BadRequest } from '../../utils/errors';

export const validateEvent = (requestBody: calendar_v3.Schema$Event) => {
  const schema = Joi.object()
    .required()
    .keys({
      summary: Joi.string().min(1).required(),
      description: Joi.string().min(1).required(),
      start: Joi.object()
        .keys({
          dateTime: Joi.date(),
          timeZone: Joi.string(),
        })
        .required(),
      end: Joi.object()
        .keys({
          dateTime: Joi.date(),
          timeZone: Joi.string(),
        })
        .required(),
      organizer: Joi.object()
        .keys({
          email: Joi.string().email().required(),
          self: Joi.boolean(),
        })
        .required(),
      attendees: Joi.array()
        .items(
          Joi.object().keys({
            email: Joi.string().email().required(),
            displayName: Joi.string().min(1),
            resource: Joi.boolean(),
            organizer: Joi.boolean(),
            self: Joi.boolean(),
          }),
        )
        .required(),
    });

  const { error } = schema.validate(requestBody);
  if (error) {
    throw new BadRequest(error.details);
  }
};

export const validateCreateEventRequest = (
  requestBody: calendar_v3.Schema$Event,
) => {
  validateEvent(requestBody);
};

export const validateUpdateEventRequest = (
  requestBody: calendar_v3.Schema$Event,
  email: string,
) => {
  validateEvent(requestBody);
  const schema = Joi.object()
    .keys({
      email: Joi.string().email().required(),
    })
    .required();

  const { error } = schema.validate({ email });
  if (error) {
    throw new BadRequest(error.details);
  }
};

export const validateDeleteEventRequest = (email: string) => {
  const schema = Joi.object()
    .keys({
      email: Joi.string().email().required(),
    })
    .required();

  const { error } = schema.validate({ email });
  if (error) {
    throw new BadRequest(error.details);
  }
};
