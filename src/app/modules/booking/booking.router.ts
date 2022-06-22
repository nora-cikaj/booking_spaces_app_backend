import Router from 'express';
import authenticated from '../../middleware/authenticated';
import * as controller from './booking.controller';
import routes from '../../constants/routes';

const router = Router();

/**
 * @openapi
 *
 * components:
 *  schemas:
 *    Booking:
 *      type: "object"
 *      required:
 *        - id
 *        - title
 *        - bookingType
 *        - spaceId
 *        - fromTime
 *        - toTime
 *        - repeat
 *      properties:
 *        id:
 *          type: "number"
 *        title:
 *          type: "string"
 *        description:
 *          type: "string"
 *        bookingType:
 *          type: "string"
 *          default: USER_BOOKING
 *          enum:
 *            - USER_BOOKING
 *            - INTERNAL_USE
 *            - UNAVAILABLE
 *        spaceId:
 *          type: "number"
 *        fromTime:
 *          type: "number"
 *        toTime:
 *          type: "number"
 *        repeat:
 *          type: "boolean"
 *          default: false
 *        interval:
 *          type: "number"
 *        endBy:
 *          type: "number"
 *        createdAt:
 *          type: "string"
 */

/**
 * @openapi
 *
 * paths:
 *  /booking:
 *    get:
 *      tags:
 *        - Booking
 *      summary: List all bookings for a month
 *      description: List all bookings for a month
 *      parameters:
 *        - in: query
 *          name: year
 *          description: Year
 *          type: number
 *          required: true
 *        - in: query
 *          name: month
 *          description: month
 *          type: number
 *          required: true
 *      responses:
 *        200:
 *          description: Bookings read successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: "array"
 *                items:
 *                  $ref: "#components/schemas/Booking"
 *        401:
 *          $ref: "#components/responses/401"
 *        500:
 *          $ref: "#components/responses/500"
 */
router.route(`${routes.BOOKING}`).get(
  authenticated,
  controller.listBookings,
);

/**
 * @openapi
 *
 * paths:
 *  /booking:
 *    post:
 *      tags:
 *        - Booking
 *      summary: Create a booking
 *      description: Create a booking
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: "object"
 *              properties:
 *                title:
 *                  type: "string"
 *                description:
 *                  type: "string"
 *                bookingType:
 *                  type: "string"
 *                  default: USER_BOOKING
 *                spaceId:
 *                  type: "number"
 *                fromTime:
 *                  type: "number"
 *                toTime:
 *                  type: "number"
 *                repeat:
 *                  type: "boolean"
 *                  default: false
 *                interval:
 *                  type: "number"
 *                endBy:
 *                  type: "number"
 *                attendees:
 *                  type: "array"
 *                  items:
 *                    type: "string"
 *      responses:
 *        201:
 *          description: Booking created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#components/schemas/Booking"
 *        400:
 *          $ref: "#components/responses/400"
 *        401:
 *          $ref: "#components/responses/401"
 *        404:
 *          $ref: "#components/responses/404"
 *        422:
 *          $ref: "#components/responses/422"
 *        500:
 *          $ref: "#components/responses/500"
 */

router.route(`${routes.BOOKING}`).post(
  authenticated,
  controller.createBooking,
);

/**
 * @openapi
 *
 * paths:
 *  /booking/{id}:
 *    get:
 *      tags:
 *        - Booking
 *      summary: Get a booking
 *      description: Get a booking details
 *      parameters:
 *        - in: path
 *          name: id
 *          type: number
 *          required: true
 *          description: Booking Id
 *      responses:
 *        200:
 *          description: Booking read successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#components/schemas/Booking"
 *        401:
 *          $ref: "#components/responses/401"
 *        404:
 *          $ref: "#components/responses/404"
 *        500:
 *          $ref: "#components/responses/500"
 */

router.route(`${routes.BOOKING}/:id`).get(
  authenticated,
  controller.getBooking,
);

/**
 * @openapi
 *
 * paths:
 *  /booking/{id}:
 *    put:
 *      tags:
 *        - Booking
 *      summary: Update a booking
 *      description: Update a booking
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Booking id
 *          type: number
 *          required: true
 *        - in: query
 *          name: item
 *          type: string
 *          description: Deleting the recurring events
 *        - in: query
 *          name: start
 *          type: string
 *          desctiption: Start time
 *        - in: query
 *          name: end
 *          type: string
 *          desctiption: End time
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: "object"
 *              properties:
 *                title:
 *                  type: "string"
 *                description:
 *                  type: "string"
 *                bookingType:
 *                  type: "string"
 *                  default: USER_BOOKING
 *                spaceId:
 *                  type: "number"
 *                fromTime:
 *                  type: "number"
 *                toTime:
 *                  type: "number"
 *                repeat:
 *                  type: "boolean"
 *                  default: false
 *                interval:
 *                  type: "number"
 *                endBy:
 *                  type: "number"
 *                attendees:
 *                  type: "array"
 *                  items:
 *                    type: "string"
 *      responses:
 *        200:
 *          description: Booking created successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: "array"
 *                items:
 *                  $ref: "#components/schemas/Booking"
 *        401:
 *          $ref: "#components/responses/401"
 *        401:
 *          $ref: "#components/responses/401"
 *        403:
 *          $ref: "#components/responses/403"
 *        404:
 *          $ref: "#components/responses/404"
 *        422:
 *          $ref: "#components/responses/422"
 *        500:
 *          $ref: "#components/responses/500"
 */

router.route(`${routes.BOOKING}/:id`).put(
  authenticated,
  controller.updateBooking,
);

/**
 * @openapi
 *
 * paths:
 *  /booking/{id}:
 *    delete:
 *      tags:
 *        - Booking
 *      summary: Delete a booking
 *      description: Delete a booking
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Booking id
 *          type: number
 *          required: true
 *        - in: query
 *          name: item
 *          description: Deleting the recurring events
 *        - in: query
 *          name: start
 *          desctiption: Start time
 *        - in: query
 *          name: end
 *          desctiption: End time
 *      responses:
 *        200:
 *          description: Booking created successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: "array"
 *                items:
 *                  $ref: "#components/schemas/Booking"
 *        400:
 *          $ref: "#components/responses/400"
 *        401:
 *          $ref: "#components/responses/401"
 *        403:
 *          $ref: "#components/responses/403"
 *        404:
 *          $ref: "#components/responses/404"
 *        422:
 *          $ref: "#components/responses/422"
 *        500:
 *          $ref: "#components/responses/500"
 */

router.route(`${routes.BOOKING}/:id`).delete(
  authenticated,
  controller.deleteBooking,
);

export default router;
