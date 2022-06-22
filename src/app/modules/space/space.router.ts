import Router from 'express';
import authenticated from '../../middleware/authenticated';
import authorized from '../../middleware/authorize';
import * as controller from './space.controller';
import routes from '../../constants/routes';

const router = Router();

/**
 * @openapi
 *
 * components:
 *  schemas:
 *    Space:
 *      type: "object"
 *      required:
 *        - id
 *        - name
 *        - capacity
 *      properties:
 *        id:
 *          type: "number"
 *        name:
 *          type: "string"
 *        capacity:
 *          type: "number"
 *        minCapacity:
 *          type: "number"
 *        timeRestriction:
 *          type: "number"
 *        createdAt:
 *          type: "string"
 *        createdBy:
 *          type: "string"
 *
 */

/**
 * @openapi
 *
 * paths:
 *  /space:
 *    post:
 *      tags:
 *        - Space
 *      summary: Create a space
 *      description: Create a new space
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: "object"
 *              properties:
 *                name:
 *                  type: "string"
 *                capacity:
 *                  type: "number"
 *                  default: 1
 *                minCapacity:
 *                  type: "number"
 *                  default: 1
 *                timeRestriction:
 *                  type: "number"
 *      responses:
 *        201:
 *          description: Space created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#components/schemas/Space"
 *        400:
 *          $ref: "#components/responses/400"
 *        401:
 *          $ref: "#components/responses/401"
 *        403:
 *          $ref: "#components/responses/403"
 *        422:
 *          $ref: "#components/responses/422"
 *        500:
 *          $ref: "#components/responses/500"
 */
router.route(`${routes.SPACE}`).post(
  authenticated,
  authorized,
  controller.createSpace,
);

/**
 * @openapi
 *
 * paths:
 *  /space/{id}:
 *    get:
 *      tags:
 *        - Space
 *      summary: Get a space
 *      description: Get a space
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          type: number
 *          description: Space id
 *      responses:
 *        200:
 *          description: Space read successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#components/schemas/Space"
 *        400:
 *          $ref: "#components/responses/400"
 *        401:
 *          $ref: "#components/responses/401"
 *        404:
 *          $ref: "#components/responses/404"
 *        500:
 *          $ref: "#components/responses/500"
 */
router.route(`${routes.SPACE}/:id`).get(
  authenticated,
  controller.getSpace,
);

/**
 * @openapi
 *
 * paths:
 *  /space:
 *    get:
 *      tags:
 *        - Space
 *      summary: Get all spaces
 *      description: Get all spaces
 *      responses:
 *        200:
 *          description: Spaces read successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: "array"
 *                items:
 *                  $ref: "#components/schemas/Space"
 *        401:
 *          $ref: "#components/responses/401"
 *        500:
 *          $ref: "#components/responses/500"
 */

router.route(`${routes.SPACE}`).get(
  authenticated,
  controller.listSpaces,
);

/**
 * @openapi
 *
 * paths:
 *  /space/{id}:
 *    patch:
 *      tags:
 *        - Space
 *      summary: Update a space
 *      description: Update a space
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          type: "number"
 *          description: Space id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: "object"
 *              properties:
 *                name:
 *                  type: "string"
 *                capacity:
 *                  type: "number"
 *                  default: 1
 *                minCapacity:
 *                  type: "number"
 *                  default: 1
 *                timeRestriction:
 *                  type: "number"
 *      responses:
 *        204:
 *          description: Space details updated successfully
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

router.route(`${routes.SPACE}/:id`).patch(
  authenticated,
  authorized,
  controller.updateSpace,
);

/**
 * @openapi
 *
 * paths:
 *  /space/{id}:
 *    delete:
 *      tags:
 *        - Space
 *      summary: Delete a space
 *      description: Delete a space
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          type: number
 *          description: Space id
 *      responses:
 *        204:
 *          description: Space deleted successfully
 *        401:
 *          $ref: "#components/responses/401"
 *        403:
 *          $ref: "#components/responses/403"
 *        404:
 *          $ref: "#components/responses/404"
 *        500:
 *          $ref: "#components/responses/500"
 */

router.route(`${routes.SPACE}/:id`).delete(
  authenticated,
  authorized,
  controller.deleteSpace,
);

export default router;
