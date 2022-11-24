import Router from 'express';
import authenticated from '../../middleware/authenticated';
import * as controller from './user.controller';
import routes from '../../constants/routes';

const router = Router();

/**
 * @openapi
 * paths:
 *  /logged-in-user:
 *    get:
 *      tags:
 *        - User
 *      summary: Get logged in user
 *      description: Get logged in user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: "object"
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
 *          description: User received successfully
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

router
  .route(`${routes.LOGGED_IN_USER}`)
  .get(authenticated, controller.getLoggedInUser);

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

router.route(`${routes.USER}`).post(authenticated, controller.upsertUser);

/**
 * @openapi
 * paths:
 *  /user:
 *    get:
 *      tags:
 *        - User
 *      summary: Get all active users
 *      description: Get all active users
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: "object"
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
 *          description: Users received successfully
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
router.route(`${routes.USER}`).get(authenticated, controller.getAllActiveUsers);

export default router;
