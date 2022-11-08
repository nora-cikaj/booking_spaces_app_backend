import Router from 'express';
import * as controller from './event.controller';
import routes from '../../constants/routes';

const router = Router();

/**
 * @openapi
 *
 * components:
 *  schemas:
 *    Event:
 *      type: "object"
 *      required:
 *        - id
 *        - summary
 *        - attendees
 *        - start
 *        - end
 *        - creator
 *      properties:
 *        id:
 *          type: "string"
 *        summary:
 *          type: "string"
 *        description:
 *          type: "string"
 *        start:
 *          type: object
 *          properties:
 *            dateTime:
 *              type: "string"
 *            timeZone:
 *              type: "string"
 *        end:
 *          type: "object"
 *          properties:
 *            dateTime:
 *              type: "string"
 *            timeZone:
 *              type: "string"
 *        creator:
 *          type: "object"
 *          properties:
 *            displayName:
 *              type: "string"
 *            timeZone:
 *              self: "string"
 *        attendees:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              email:
 *                type: "string"
 *                format: "email"
 *              resource:
 *                type: "boolean"
 *              organizer:
 *                type: "boolean"
 */

/**
 * @openapi
 *
 * paths:
 *  /events:
 *    get:
 *      tags:
 *        - Event
 *      summary: List all events for a single day
 *      description: List events of the day
 *      responses:
 *        200:
 *          description: Events read successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: "array"
 *                items:
 *                  $ref: "#components/schemas/Event"
 *        400:
 *          $ref: "#components/responses/400"
 *        401:
 *          $ref: "#components/responses/401"
 *        500:
 *          $ref: "#components/responses/500"
 */
router.route(`${routes.EVENT}`).get(controller.listEvents);
/**
 * @openapi
 *
 * paths:
 *  /events:
 *    post:
 *      tags:
 *        - Event
 *      summary: Create an event
 *      description: Create an event
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: "object"
 *              properties:
 *                summary:
 *                  type: "string"
 *                description:
 *                  type: "string"
 *                start:
 *                  type: object
 *                  properties:
 *                    dateTime:
 *                      type: "string"
 *                    timeZone:
 *                      type: "string"
 *                end:
 *                  type: object
 *                  properties:
 *                    dateTime:
 *                      type: "string"
 *                    timeZone:
 *                      type: "string"
 *                creator:
 *                  type: "object"
 *                  properties:
 *                    email:
 *                      type: "string"
 *                    organizer:
 *                      type: "boolean"
 *                    self:
 *                      type: "boolean"
 *                attendees:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      email:
 *                        type: "string"
 *                        format: "email"
 *                      resource:
 *                        type: "boolean"
 *                      organizer:
 *                        type: "boolean"
 *
 *      responses:
 *        201:
 *          description: Event created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#components/schemas/Event"
 *        400:
 *          $ref: "#components/responses/400"
 *        401:
 *          $ref: "#components/responses/401"
 *        404:
 *          $ref: "#components/responses/404"
 *        500:
 *          $ref: "#components/responses/500"
 */
router.route(`${routes.EVENT}`).post(controller.createEvent);

/**
 * @openapi
 *
 * paths:
 *  /events/{id}:
 *    put:
 *      tags:
 *        - Event
 *      summary: Update an event
 *      description: Update an event
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Event id
 *          type: string
 *          required: true
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: "object"
 *              properties:
 *                summary:
 *                  type: "string"
 *                description:
 *                  type: "string"
 *                start:
 *                  type: "object"
 *                  properties:
 *                    dateTime:
 *                      type: "string"
 *                    timeZone:
 *                      type: "string"
 *                end:
 *                  type: "object"
 *                  properties:
 *                    dateTime:
 *                      type: "string"
 *                    timeZone:
 *                      type: "string"
 *                creator:
 *                  type: "object"
 *                  properties:
 *                    email:
 *                      type: "string"
 *                      format: "email"
 *                    organizer:
 *                      type: "boolean"
 *                    self:
 *                      type: "boolean"
 *                attendees:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      email:
 *                        type: "string"
 *                        format: "email"
 *                      resource:
 *                        type: "boolean"
 *                      organizer:
 *                        type: "boolean"
 *      responses:
 *        200:
 *          description: Booking created successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: "array"
 *                items:
 *                  $ref: "#components/schemas/Event"
 *        400:
 *          $ref: "#components/responses/400"
 *        401:
 *          $ref: "#components/responses/401"
 *        403:
 *          $ref: "#components/responses/403"
 *        404:
 *          $ref: "#components/responses/404"
 *        500:
 *          $ref: "#components/responses/500"
 */

router.route(`${routes.EVENT}/:id`).put(controller.updateEvent);
/**
 * @openapi
 *
 * paths:
 *  /events/{id}:
 *    delete:
 *      tags:
 *        - Event
 *      summary: Delete an event
 *      description: Delete an event
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Booking id
 *          type: number
 *          required: true
 *      responses:
 *        204:
 *          description: Event deleted successfully
 *        400:
 *          $ref: "#components/responses/400"
 *        401:
 *          $ref: "#components/responses/401"
 *        403:
 *          $ref: "#components/responses/403"
 *        404:
 *          $ref: "#components/responses/404"

 *        500:
 *          $ref: "#components/responses/500"
 */

router.route(`${routes.EVENT}/:id`).delete(controller.deleteEvent);

export default router;
