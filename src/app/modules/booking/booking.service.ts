import * as dal from './bookings.dal';
import { getSpace } from '../space/space.service';
import {
  validateCreateBookingRequest,
  validateBookingCapacity,
  validateBookingTime,
  validateOverlaping,
  validateUpdateBookingRequest,
  validateQueryParams,
} from './booking.validator';
import { BadRequest, NotAuthorized, NotFound } from '../../utils/errors';
import errors from '../../constants/errors';
import { Booking, CreateBookingRequestBody, UpdateBookingRequestBody } from './booking.types';
import { User } from '../../types/express';
import { Space } from '../space/space.types';

export const listBookings = async (
  { month, year },
): Promise<any> => {
  if (!month || !year) {
    throw new BadRequest(errors.BOOKING.REQUIRED_YEAR_MONTH);
  }

  let startMonth: string;
  let endMonth: string;
  let startYear: string;
  let endYear: string;

  if (month === '12') {
    startMonth = '12';
    endMonth = '01';
    startYear = `${year}`;
    endYear = `${parseInt(year, 10) + 1}`;
  } else {
    startMonth = (`0${month}`).slice(-2);
    endMonth = (`0${parseInt(month, 10) + 1}`).slice(-2);
    startYear = `${year}`;
    endYear = `${year}`;
  }

  const startDate: number = (new Date(`${startYear}-${startMonth}-01`)).getTime();
  const endDate: number = (new Date(`${endYear}-${endMonth}-01`)).getTime();

  const query = {
    OR: [
      {
        fromTime: {
          gte: startDate,
          lte: endDate,
        },
      },
      {
        repeat: true,
        OR: [
          {
            fromTime: {
              lte: endDate,
            },
          },
          {
            endBy: {
              gte: startDate,
            },
          },
        ],
      },
    ],
  };

  const bookings = await dal.listBookings({ query });
  return bookings;
};

export const createBooking = async (
  { requestBody, user }: { requestBody: CreateBookingRequestBody, user: User },
): Promise<Booking> => {
  // Validate request body
  const data = validateCreateBookingRequest({ requestBody, user });

  // Check if the space exists
  const space = await getSpace({ id: requestBody.spaceId });

  // Validate if the number of attendees is greater than the capacity
  validateBookingCapacity({ attendees: data.attendees.create, capacity: space.capacity });

  // Validate bookingTime
  validateBookingTime({
    fromTime: data.fromTime,
    toTime: data.toTime,
    timeRestriction: space.timeRestriction,
    endBy: data.endBy,
  });

  // Validate if there is a overlap while adding a new booking
  await validateOverlaping({
    fromTime: data.fromTime,
    toTime: data.toTime,
    repeat: data.repeat,
    spaceId: data.spaceId,
    interval: data.interval,
    endBy: data.endBy,
  });

  const booking = await dal.createBooking({ data });
  return booking;
};

export const getBooking = async ({ id }: { id: number }): Promise<Booking> => {
  const query = {
    id,
  };

  const booking = await dal.getBooking({ query });

  if (!booking) {
    throw new NotFound(errors.BOOKING.NOT_FOUND);
  }

  return booking;
};

export const deleteBooking = async ({
  id,
  user,
  item = 'ALL' || 'FOLLOWING' || 'SINGLE',
  start,
  end,
}: {
  id: number,
  user: User,
  item: any,
  start?: any,
  end?: any,
}): Promise<Booking[]> => {
  const existingBooking: any = await getBooking({ id });

  if (existingBooking.attendees[0].userId !== user.id) {
    throw new NotAuthorized(errors.BOOKING.NOT_AUTHORIZED);
  }

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

  const query = {
    id,
  };

  // When deleting a single event or all the recurring events, delete the booking with the given id
  if (!existingBooking.repeat
    || item === 'ALL'
    || (item === 'FOLLOWING' && start === existingBooking.fromTime)
  ) {
    await dal.deleteBooking({ query });
    return [];
  }

  // When deleting only a part of the events, starting from a "start" date,
  // update the endBy of the existing booking to "remove" the following occurrencies
  if (existingBooking.repeat && item === 'FOLLOWING') {
    const endDate = new Date(parseInt(start, 10));

    const updateData = {
      endBy: (new Date(`
        ${endDate.getFullYear()}-
        ${endDate.getMonth() + 1}-
        ${endDate.getDate()}
      `)).getTime(),
    };

    const previewsBooking = await dal.updateBooking({ query, data: updateData });
    return [
      previewsBooking,
    ];
  }
  // When deleting a single occurency of a recurrent event,
  // update the endBy of the existing booking (endBy = startDate)
  // and create a new event that starts the previews day of the "startDate"
  // and ends on the original endBy date
  if (existingBooking.repeat
    && item === 'SINGLE'
    && (parseInt(start, 10) + existingBooking.interval) < existingBooking.endBy
  ) {
    const newEndDate = new Date(parseInt(start, 10));
    const previewsBookingData = {
      endBy: (new Date(`
        ${newEndDate.getFullYear()}-
        ${newEndDate.getMonth() + 1}-
        ${newEndDate.getDate()}
      `)).getTime(),
    };

    const attendees = existingBooking.attendees.map((attendee) => {
      const mappedUser = { userId: attendee.userId, creator: attendee.creator };
      return mappedUser;
    });

    const newEventData = {
      ...existingBooking,
      fromTime: parseInt(start, 10) + existingBooking.interval,
      toTime: parseInt(end, 10) + existingBooking.interval,
      attendees: {
        create: [
          ...attendees,
        ],
      },
    };
    if (existingBooking.endBy) {
      newEventData.endBy = parseInt(existingBooking.endBy, 10);
    }
    delete newEventData.id;

    const previewsBooking = await dal.updateBooking({ query, data: previewsBookingData });
    const newBooking = await dal.createBooking({ data: newEventData });
    return [
      previewsBooking,
      newBooking,
    ];
  }
};

export const updateBooking = async ({
  user,
  id,
  requestBody,
  item = 'ALL' || 'FOLLOWING' || 'SINGLE',
  start,
  end,
}: {
  user: User,
  id: number,
  requestBody: UpdateBookingRequestBody,
  item: any,
  start: any,
  end: any,
}): Promise<Booking[]> => {
  // Check if there is a booking with this id
  const existingBooking: any = await getBooking({ id });

  // The creator is always the first element of the array "attendees"
  if (existingBooking.attendees[0].userId !== user.id) {
    throw new NotAuthorized(errors.BOOKING.NOT_AUTHORIZED);
  }

  // Validate the request body
  const data = validateUpdateBookingRequest({
    bookingType: existingBooking.bookingType,
    requestBody,
    user,
  });

  // Validate the query params
  validateQueryParams({
    existingBooking,
    item,
    start,
    end,
    requestBody,
  });

  // Check if there is a space with that id
  const space: Space = await getSpace({ id: data.spaceId });

  if (data.attendees) {
    // Validate booking capacity
    validateBookingCapacity({ attendees: data.attendees.create, capacity: space.capacity });
  }

  // Validate bookingTime
  validateBookingTime({
    fromTime: data.fromTime,
    toTime: data.toTime,
    endBy: data.endBy,
    timeRestriction: space.timeRestriction,
  });

  // Validate overlapping booking
  await validateOverlaping({
    fromTime: data.fromTime,
    toTime: data.fromTime,
    bookingId: id,
    spaceId: space.id,
    repeat: data.repeat,
    interval: data.interval,
    endBy: data.endBy,
  });

  // Update all the serie of a recurring event or a single event
  if (!existingBooking.repeat || item === 'ALL') {
    if (requestBody.attendees) {
      await dal.deletePreviewsAttendees({ query: { bookingId: existingBooking.id } });
    } else {
      delete data.attendees;
    }
    const query = {
      id,
    };

    const updatedBooking = await dal.updateBooking({ query, data });
    return [
      updatedBooking,
    ];
  }

  // Update all the remaining ocurrencies of a recurring event from the starting date
  // or only an ocurrency of the recurring event
  if (existingBooking.repeat && (item === 'FOLLOWING' || item === 'SINGLE')) {
    const previewsBooking = await deleteBooking({
      id,
      user,
      item,
      start,
      end,
    });
    const newBooking = await dal.createBooking({ data });
    return [
      ...previewsBooking,
      newBooking,
    ];
  }
};
