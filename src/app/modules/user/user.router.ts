import Router from 'express';
import authenticated from '../../middleware/authenticated';
import authorized from '../../middleware/authorize';
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
 *          type: "string"
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
 *        createdAt:
 *          type: "string"
 *
 *  /logged-in-user:
 *    get:
 *      tags:
 *        - User
 *      summary: Get the logged in user
 *      description: Get the logged in user
 *      responses:
 *        200:
 *          description: User read successfully
 *          content:
 *            application/json:
 *              $ref: "#components/schemas/User"
 *        401:
 *          $ref: "#components/responses/401"
 *        500:
 *          $ref: "#components/responses/500"
 */

router.route(`${routes.LOGGED_IN_USER}`).get(
  authenticated,
  controller.getLoggedInUser,
);

/**
 * @openapi
 * paths:
 *  /user:
 *    get:
 *      tags:
 *        - User
 *      summary: Get users
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
 *      summary: Upsert user
 *      description: Create a new user or update the existing one
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: "object"
 *              required:
 *                - id
 *                - email
 *              properties:
 *                id:
 *                  type: "string"
 *                name:
 *                  type: "string"
 *                lastName:
 *                  type: "string"
 *                email:
 *                  type: "string"
 *                avatarUrl:
 *                  type: "string"
 *      responses:
 *        200:
 *          description: Users created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#components/schemas/User"
 *        400:
 *          $ref: "#components/responses/400"
 *        401:
 *          $ref: "#components/responses/401"
 *        500:
 *          $ref: "#components/responses/500"
 */

router.route(`${routes.USER}`).post(
  authenticated,
  controller.upsertUser,
);

/**
 * @openapi
 * paths:
 *  /user/{id}:
 *    get:
 *      tags:
 *        - User
 *      summary: Get user
 *      description: Get a single user
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
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

/**
 * @openapi
 * paths:
 *  /user/{id}:
 *    patch:
 *      tags:
 *        - User
 *      summary: Update permissions
 *      description: Update permissions
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          description: User id
 *        - in: query
 *          name: admin
 *          type: boolean
 *          required: true
 *          description: Admin
 *      responses:
 *        204:
 *          description: Users updated successfully
 *        401:
 *          $ref: "#components/responses/401"
 *        403:
 *          $ref: "#components/responses/403"
 *        404:
 *          $ref: "#components/responses/404"
 *        500:
 *          $ref: "#components/responses/500"
 */

router.route(`${routes.USER}/:id`).patch(
  authenticated,
  authorized,
  controller.updateUser,
);

/**
 * @openapi
 * paths:
 *  /user/{id}:
 *    delete:
 *      tags:
 *        - User
 *      summary: Delete user
 *      description: Delete user
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          description: User id
 *      responses:
 *        204:
 *          description: Users deleted successfully
 *        401:
 *          $ref: "#components/responses/401"
 *        403:
 *          $ref: "#components/responses/403"
 *        404:
 *          $ref: "#components/responses/404"
 *        500:
 *          $ref: "#components/responses/500"
 */

router.route(`${routes.USER}/:id`).delete(
  authenticated,
  authorized,
  controller.deleteUser,
);
export default router;
