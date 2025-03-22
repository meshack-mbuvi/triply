/**
 * @swagger
 * /api/trips/{id}:
 *   delete:
 *     summary: Delete your own existing trip
 *     tags: [Trips]
 *     security:
 *       - BearerAuth: []
 *     description: Allows authenticated users to delete a trip.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the trip to update
 *     responses:
 *       200:
 *         description: Trip deleted successfully
 *       401:
 *         description: Unauthorized (No token or invalid token)
 *       404:
 *         description: Trip not found
 *       500:
 *         description: Internal server error
 */
