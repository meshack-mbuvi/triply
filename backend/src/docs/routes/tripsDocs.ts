/**
 * @swagger
 * /api/trips:
 *   post:
 *     summary: Create a new trip
 *     tags: [Trips]
 *     security:
 *       - BearerAuth: []
 *     description: Allows authenticated users to create a new trip.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, from, destination, startDate, endDate, price]
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Beach Vacation"
 *               description:
 *                 type: string
 *                 example: "A relaxing trip to the Maldives."
 *               origin:
 *                 type: string
 *                 example: "New York"
 *               destination:
 *                 type: string
 *                 example: "Maldives"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-10"
 *               price:
 *                 type: number
 *                 example: 1500.00
 *     responses:
 *       201:
 *         description: Trip created successfully
 *       400:
 *         description: Bad request (Invalid input)
 *       401:
 *         description: Unauthorized (No token or invalid token)
 *       500:
 *         description: Internal server error
 */

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
