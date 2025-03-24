/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get authenticated user details
 *     tags: [Users]
 *     description: Retrieves the details of the authenticated user based on the provided token.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
