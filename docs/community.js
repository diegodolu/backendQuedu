// ----------------- Endpoint GET - /communities -----------------

/**
 * @swagger
 * /communities:
 *   get:
 *     summary: Obtener todas las comunidades
 *     tags:
 *       - Comunidades
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de comunidades obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 community:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: ID de la comunidad
 *                         example: "60d21b4667d0d8992e610c85"
 *                       name:
 *                         type: string
 *                         description: Nombre de la comunidad
 *                         example: "Comunidad de Tecnología"
 *                       description:
 *                         type: string
 *                         description: Descripción de la comunidad
 *                         example: "Una comunidad para entusiastas de la tecnología"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de creación de la comunidad
 *                         example: "2024-11-28T10:00:00Z"
 *       404:
 *         description: No se encontraron comunidades
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No hay comunidades"
 *       500:
 *         description: Error en la petición
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error en la petición"
 */
