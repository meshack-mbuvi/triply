/**
 * @swagger
 * /api/users/profile:
 *   patch:
 *     summary: Update user profile
 *     tags: [Users]
 *     description: Allows authenticated users to update their full name, and/or bio. At least one field must be provided.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               bio:
 *                 type: string
 *                 example: "Software developer passionate about blockchain technology."
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User updated successfully"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request (At least one field must be provided)
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
