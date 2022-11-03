import Router from 'express';
import * as controller from './users.controller';
import routes from '../../constants/routes';

const router = Router();

/**
 * @openapi
 * paths:
 *  /users:
 *    get:
 *      tags:
 *        - Users
 *      summary: Get users list from softup workspace
 *      description: Get all users list from softup workspace
 *      responses:
 *        200:
 *          description: Users list read successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: "array"
 *                items:
 *                  $ref: "#components/schemas/Users"
 *        401:
 *          $ref: "#components/responses/401"
 *        404:
 *          $ref: "#components/responses/404"
 *        500:
 *          $ref: "#components/responses/500"
 */
router.route(`${routes.USERS}`).get(controller.getUsers);

export default router;
