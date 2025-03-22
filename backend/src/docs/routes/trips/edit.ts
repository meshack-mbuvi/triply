/**
 * @swagger
 * /api/trips/{id}:
 *   patch:
 *     summary: Update an existing trip
 *     tags: [Trips]
 *     security:
 *       - BearerAuth: []
 *     description: Allows authenticated users to update a trip's details.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the trip to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Beach Vacation"
 *               description:
 *                 type: string
 *                 example: "A more relaxing trip to the Maldives."
 *               origin:
 *                 type: string
 *                 example: "Los Angeles"
 *               destination:
 *                 type: string
 *                 example: "Maldives"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-05"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-15"
 *               price:
 *                 type: number
 *                 example: 1800.00
 *     responses:
 *       200:
 *         description: Trip updated successfully
 *       400:
 *         description: Bad request (Invalid input)
 *       401:
 *         description: Unauthorized (No token or invalid token)
 *       404:
 *         description: Trip not found
 *       500:
 *         description: Internal server error
 */
