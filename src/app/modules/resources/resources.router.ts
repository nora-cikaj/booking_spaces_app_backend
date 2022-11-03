import Router from 'express';
import * as controller from './resources.controller';
import routes from '../../constants/routes';

const router = Router();

/**
 * @openapi
 * paths:
 *  /resources:
 *    get:
 *      tags:
 *        - Resources
 *      summary: Get resources
 *      description: Get all resources
 *      responses:
 *        200:
 *          description: Resources read successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: "array"
 *                items:
 *                  $ref: "#components/schemas/Resources"
 *        401:
 *          $ref: "#components/responses/401"
 *        404:
 *          $ref: "#components/responses/404"
 *        500:
 *          $ref: "#components/responses/500"
 */
router.route(`${routes.RESOURCES}`).get(controller.getResources);

export default router;
