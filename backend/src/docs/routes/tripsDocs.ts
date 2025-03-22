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
