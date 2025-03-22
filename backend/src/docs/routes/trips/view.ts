/**
 * @swagger
 * /api/trips:
 *   get:
 *     summary: Retrieve a list of trips for the authenticated user
 *     tags: [Trips]
 *     security:
 *       - BearerAuth: []
 *     description: Fetch paginated trips belonging to the authenticated user.
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of trips per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: Successfully retrieved trips
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 trips:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Trip'
 *                 total:
 *                   type: integer
 *                   description: Total number of trips
 *                   example: 25
 *                 page:
 *                   type: integer
 *                   description: Current page number
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages
 *                   example: 3
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/trips/{id}:
 *   get:
 *     summary: Retrieve a single trips for the authenticated user
 *     tags: [Trips]
 *     security:
 *       - BearerAuth: []
 *     description: Fetch a trip belonging to the authenticated user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the trip to fetch
 *     responses:
 *       200:
 *         description: Successfully retrieved trip
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Trip'
 *
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 *       500:
 *         description: Internal server error
 */
