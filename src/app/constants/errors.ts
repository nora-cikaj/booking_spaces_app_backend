export default {
  AUTH: {
    NOT_AUTHENTICATED: 'You are not authenticated',
    NOT_AUTHORIZED: 'You are not authorized for this action',
    EXISTING_USER: 'A user with the existing id already exists in the database',
    USER_NOT_FOUND: 'The user with the given id does not exist in the database',
  },
  SPACE: {
    NOT_FOUND: 'The space with the given id does not exist in the database',
    DOUBLE_SPACE: 'A space with the requested name already exists in the database',
  },
  BOOKING: {
    REQUIRED_INTERVAL: '"interval" is required',
    TIME_COMPARISON: 'The ending time should be greater than the starting time',
    CURRENT_TIME_COMPARISON: 'You can only book spaces starting from the current time',
    END_BY_TIME_COMPARISON: 'The ending date (endBy) of the stop repeat should be greater than the current date',
    NOT_FOUND: 'The booking with the requested id does not exist in the database',
    OVERLAPING_BOOKING: 'Can not save the booking because it overlaps another booking on',
    REQUIRED_ITEM: '"item" is required in the query parameters',
    REQUIRED_START: '"start" is required in the query parameters',
    REQUIRED_END: '"end" is required in the query parameters',
    EDIT_START_TIME: 'The new event should start after the end of the previews recurring event',
    REQUIRED_YEAR_MONTH: '"year" and "month" are required in the query parameters',
    NOT_AUTHORIZED: 'You should be the creator of this booking to be able to complete this action',
  },
};
