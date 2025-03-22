/**
 * @swagger
 * /api/trips/filter:
 *   get:
 *     summary: Filter trips based on criteria
 *     tags: [Trips]
 *     security:
 *       - BearerAuth: []
 *     description: Retrieve trips based on filters such as origin, destination, start date, end date, and price range.
 *     parameters:
 *       - in: query
 *         name: origin
 *         schema:
 *           type: string
 *         description: Filter trips by origin (case insensitive)
 *         example: "New York"
 *       - in: query
 *         name: destination
 *         schema:
 *           type: string
 *         description: Filter trips by destination (case insensitive)
 *         example: "Maldives"
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter trips that start on or after this date
 *         example: "2025-06-01"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter trips that end on or before this date
 *         example: "2025-06-10"
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price filter
 *         example: 100
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price filter
 *         example: 5000
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Pagination - page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Pagination - number of results per page
 *     responses:
 *       200:
 *         description: Successfully retrieved filtered trips
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
 *                   description: Total number of matching trips
 *                 page:
 *                   type: integer
 *                   description: Current page number
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages
 *       400:
 *         description: Bad request (invalid query parameters)
 *       401:
 *         description: Unauthorized (No token or invalid token)
 *       500:
 *         description: Internal server error
 */
