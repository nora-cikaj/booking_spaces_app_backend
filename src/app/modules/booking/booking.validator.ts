import Joi from 'joi';
import { BadRequest, UnprocessableEntity } from '../../utils/errors';
import { CreateBookingRequestBody, UpdateBookingRequestBody } from './booking.types';
import errors from '../../constants/errors';
import { User } from '../../types/express';
import { findOverlaping } from './bookings.dal';

export const validateCreateBookingRequest = (
  { requestBody, user }: { requestBody: CreateBookingRequestBody, user: User },
): CreateBookingRequestBody => {
  const schema = Joi.object().keys({
    title: Joi.string().trim(true).required(),
    description: Joi.string().trim(),
    bookingType: Joi.string().valid('USER_BOOKING', 'INTERNAL_USE', 'UNAVAILABLE'),
    spaceId: Joi.number().required(),
    fromTime: Joi.number().required(),
    toTime: Joi.number().required(),
    repeat: Joi.boolean().required(),
    interval: Joi.number(),
    endBy: Joi.number(),
    attendees: Joi.array().items(Joi.string()),
  }).required();

  const result = schema.validate(requestBody);

  if (result.error) {
    throw new BadRequest(result.error.message);
  }

  const validatedData = result.value;

  if (validatedData.interval) {
    if (!validatedData.interval) {
      throw new BadRequest(errors.BOOKING.REQUIRED_INTERVAL);
    }
  }

  let attendees = [];
  if (validatedData.bookingType === 'USER_BOOKING' && validatedData.attendees) {
    attendees = validatedData.attendees.filter((id: string) => id !== user.id);

    attendees = attendees.map((id: string) => {
      const mappedUser = { userId: id, creator: false };
      return mappedUser;
    });
  }

  validatedData.attendees = {
    create: [
      {
        userId: user.id,
        creator: true,
      },
      ...attendees,
    ],
  };

  return validatedData;
};

export const validateBookingCapacity = ({ attendees, capacity }): void => {
  if (attendees.length > capacity) {
    throw new UnprocessableEntity(`This space can not be booked for more than ${capacity} people`);
  }
};

export const validateBookingTime = (
  {
    fromTime,
    toTime,
    endBy,
    timeRestriction,
  }: {
    fromTime: number,
    toTime: number,
    endBy?: number,
    timeRestriction?: number,
  },
): void => {
  if (fromTime < (new Date()).getTime()) {
    throw new UnprocessableEntity(errors.BOOKING.CURRENT_TIME_COMPARISON);
  }

  if (toTime <= fromTime) {
    throw new UnprocessableEntity(errors.BOOKING.TIME_COMPARISON);
  }

  if (endBy) {
    if (endBy < toTime) {
      throw new UnprocessableEntity(errors.BOOKING.END_BY_TIME_COMPARISON);
    }
  }

  if (timeRestriction) {
    if (Math.floor((toTime - fromTime) / 60000) > timeRestriction) {
      throw new UnprocessableEntity(`This space can not be booked for more than ${timeRestriction} minutes`);
    }
  }
};

export const validateOverlaping = async ({
  fromTime,
  toTime,
  bookingId = 0,
  spaceId,
  repeat,
  interval = 0,
  endBy = 0,
}: {
  fromTime: number,
  toTime: number,
  bookingId?: number,
  spaceId: number,
  repeat: boolean,
  interval?: number
  endBy?: number,
}): Promise<void> => {
  let updateCheck = 'id > 0';
  if (bookingId) {
    updateCheck = `id != ${bookingId}`;
  }

  const query = `SELECT id, from_time from "Booking"
    WHERE (
      (space_id = ${spaceId}) AND ${updateCheck} AND (
        (from_time <= ${fromTime} AND to_time >= ${toTime}) OR
        (from_time >= ${fromTime} AND from_time < ${toTime}) OR
        (to_time > ${fromTime} AND to_time <= ${toTime}) OR
        (repeat = true AND ${fromTime} > to_time AND (end_by is null OR end_by > ${toTime} ) AND (
          ((${fromTime} - from_time) % interval < (${toTime} - ${fromTime}) AND 
            ((${fromTime} - from_time) % interval >= 0)
          ) OR
          (((${toTime} - to_time) % interval > interval - (${toTime} - ${fromTime}))
          ) OR 
          (((${fromTime} - from_time) % interval > interval - (${toTime} - ${fromTime})) AND
            ((${toTime} - to_time) % interval < (${toTime} - ${fromTime}))
          )
        )) OR 
        (${repeat} = true AND from_time > ${toTime} AND (${endBy} = 0 OR ${endBy} > from_time) AND (
          ((from_time - ${fromTime}) % ${interval} < (to_time - from_time) - (${toTime} - ${fromTime}) OR
            ((from_time - ${fromTime}) % ${interval} < (to_time - from_time)) OR 
            ((from_time - ${fromTime}) % ${interval} > ${interval} - (to_time - from_time))
          ) OR 
          (((to_time - ${toTime}) % ${interval} < (to_time - from_time))
          ) OR 
          (((from_time - ${fromTime}) % ${interval} > ${interval} - (to_time - from_time)) AND 
            ((to_time - ${toTime}) % ${interval} < (to_time - from_time))
          )
        ))
      )
    )`;

  const overlapingBooking = await findOverlaping({ query });
  console.log(overlapingBooking);

  if (overlapingBooking.length > 0) {
    const date = new Date(overlapingBooking[0].from_time);
    throw new UnprocessableEntity(`${errors.BOOKING.OVERLAPING_BOOKING} ${date.toUTCString()}`);
  }
};

export const validateUpdateBookingRequest = ({
  requestBody,
  user,
  bookingType,
}: {
  requestBody: UpdateBookingRequestBody,
  user: User,
  bookingType: string,
}): CreateBookingRequestBody => {
  const schema = Joi.object().keys({
    title: Joi.string().trim(true).required(),
    description: Joi.string(),
    bookingType: Joi.string().required(),
    spaceId: Joi.number().required(),
    fromTime: Joi.number().required(),
    toTime: Joi.number().required(),
    repeat: Joi.boolean().required(),
    interval: Joi.number(),
    endBy: Joi.number(),
    attendees: Joi.array().items(Joi.string()),
  });

  const result = schema.validate(requestBody);

  if (result.error) {
    throw new BadRequest(result.error.message);
  }

  const validatedData = result.value;

  if (validatedData.interval) {
    if (!validatedData.interval) {
      throw new BadRequest(errors.BOOKING.REQUIRED_INTERVAL);
    }
  }

  let attendees = [];
  if (bookingType === 'USER_BOOKING') {
    if (validatedData.attendees) {
      attendees = validatedData.attendees.filter((id: string) => id !== user.id);

      attendees = attendees.map((id: string) => {
        const mappedUser = { userId: id, creator: false };
        return mappedUser;
      });
    }
  }

  validatedData.attendees = {
    create: [
      {
        userId: user.id,
        creator: true,
      },
      ...attendees,
    ],
  };

  return validatedData;
};

export const validateQueryParams = ({
  existingBooking,
  item = 'SINGLE' || 'FOLLOWING' || 'ALL',
  requestBody,
  start,
  end,
}: {
  existingBooking: any,
  requestBody: UpdateBookingRequestBody,
  item?: string,
  start?: number,
  end?: number,
}) => {
  if (existingBooking.repeat) {
    if (!item) {
      throw new BadRequest(errors.BOOKING.REQUIRED_ITEM);
    }
    if (item !== 'ALL' && !start) {
      throw new BadRequest(errors.BOOKING.REQUIRED_START);
    }
    if (item === 'SINGLE' && !start && !end) {
      throw new BadRequest(errors.BOOKING.REQUIRED_END);
    }
  }

  if (start) {
    if (start - existingBooking.interval >= requestBody.fromTime
      || start + existingBooking.interval <= requestBody.fromTime) {
      throw new UnprocessableEntity(errors.BOOKING.EDIT_START_TIME);
    }
  }
};
