import Router from 'express';
import authenticated from '../../middleware/authenticated';
import * as controller from './user.controller';
import routes from '../../constants/routes';

const router = Router();

/**
 * @openapi
 *
 * components:
 *  schemas:
 *    User:
 *      type: "object"
 *      required:
 *        - id
 *        - email
 *        - admin
 *      properties:
 *        id:
 *          type: "integer"
 *        name:
 *          type: "string"
 *        lastName:
 *          type: "string"
 *        email:
 *          type: "string"
 *        avatarUrl:
 *          type: "string"
 *        admin:
 *          type: "boolean"
 *
 * paths:
 *  /user:
 *    get:
 *      tags:
 *        - User
 *      summery: Get users
 *      description: Get all users
 *      responses:
 *        200:
 *          description: Users read successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: "array"
 *                items:
 *                  $ref: "#components/schemas/User"
 *        401:
 *          $ref: "#components/responses/401"
 *        404:
 *          $ref: "#components/responses/404"
 *        500:
 *          $ref: "#components/responses/500"
 */
router.route(`${routes.USER}`).get(
  authenticated,
  controller.getUsers,
);

/**
 * @openapi
 * paths:
 *  /user:
 *    post:
 *      tags:
 *        - User
 *      summery: Create user
 *      description: Create a new user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/User'
 *      responses:
 *        201:
 *          description: Users created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#components/schemas/User"
 *        401:
 *          $ref: "#components/responses/401"
 *        404:
 *          $ref: "#components/responses/404"
 *        500:
 *          $ref: "#components/responses/500"
 */

router.route(`${routes.USER}`).post(
  authenticated,
  controller.createUser,
);

/**
 * @openapi
 * paths:
 *  /user/{id}:
 *    get:
 *      tags:
 *        - User
 *      summery: Get user
 *      description: Get a single user
 *      parameters:
 *        - in: path
 *          name: id
 *          type: number
 *          required: true
 *          description: User id
 *      responses:
 *        200:
 *          description: Users read successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#components/schemas/User"
 *        401:
 *          $ref: "#components/responses/401"
 *        404:
 *          $ref: "#components/responses/404"
 *        500:
 *          $ref: "#components/responses/500"
 */

router.route(`${routes.USER}/:id`).get(
  authenticated,
  controller.getSingleUser,
);

export default router;
