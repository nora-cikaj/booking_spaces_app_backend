import Router from 'express';
import * as controller from './freebusy.controller';
import routes from '../../constants/routes';

const router = Router();

/**
 * @openapi
 *
 * components:
 *  schemas:
 *    Freebusy:
 *      type: "object"
 *      required:
 *        - timeMin
 *        - timeMax
 *      properties:
 *        kind:
 *          type: "string"
 *        timeMin:
 *          type: "string"
 *          format: "datetime"
 *        timeMax:
 *          type: "string"
 *          format: "datetime"
 *        calendars:
 *          type: object
 *          properties:
 *            busy:
 *              type: "array"
 *              items:
 *                type: "object"
 *                properties:
 *                  start:
 *                    type: "string"
 *                    format: "datetime"
 *                  end:
 *                    type: "string"
 *                    format: "datetime"
 */

/**
 * @openapi
 *
 * paths:
 *  /freebusy:
 *    post:
 *      tags:
 *        - Freebusy
 *      summary: List freebusy of a specific calendar
 *      description: List freebusy of a specific calendar
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: "object"
 *              properties:
 *                timeMin:
 *                  type: "string"
 *                timeMax:
 *                  type: "string"
 *      responses:
 *        200:
 *          description: Freebusy were read successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: "array"
 *                items:
 *                  $ref: "#components/schemas/Freebusy"
 *        400:
 *          $ref: "#components/responses/400"
 *        401:
 *          $ref: "#components/responses/401"
 *        500:
 *          $ref: "#components/responses/500"
 */
router.route(`${routes.FREEBUSY}`).post(controller.getFreeBusyList);

export default router;
