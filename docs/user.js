// ----------------- Endpoint GET - /user/{id} -----------------

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Obtener información de un usuario por ID
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Información del usuario obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nombre:
 *                   type: string
 *                   example: Diego
 *                 email:
 *                   type: string
 *                   example: diego@example.com
 *       404:
 *         description: Usuario no encontrado
 */





// ----------------- Endpoint POST - /user -----------------
/**
 * @swagger
 * /user:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: password123
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: johndoe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *       500:
 *         description: Error al guardar el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al guardar el usuario
 */





// ----------------- Endpoint POST - /user/login -----------------
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Inicio de sesión exitoso
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: johndoe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Contraseña incorrecta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contraseña incorrecta
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error al iniciar sesión
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al iniciar sesión: <detalle del error>
 */




// ----------------- Endpoint GET - /user/quedus/:id -----------------
/**
 * @swagger
 * /user/quedus/{id}:
 *   get:
 *     summary: Obtener los últimos 4 quedus personales por usuario
 *     tags:
 *       - Quedus
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario para obtener los quedus personales
 *         example: 641ec8bc829c1b654df98abc
 *     responses:
 *       200:
 *         description: Últimos quedus personales obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 641ec8bc829c1b654df98abd
 *                   name:
 *                     type: string
 *                     example: Curso de Matemáticas
 *                   personalQuedus:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: Quedu 1
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: 2024-11-28T10:00:00.000Z
 *       400:
 *         description: ID de usuario no válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ID de usuario no válido
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error en la consulta
 */







// ----------------- Endpoint GET - /users/:id/courses -----------------
/**
 * @swagger
 * /users/{id}/courses:
 *   get:
 *     summary: Obtener los cursos asociados a un usuario
 *     tags:
 *       - Cursos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario cuyos cursos se quieren obtener
 *         example: 641ec8bc829c1b654df98abc
 *     responses:
 *       200:
 *         description: Cursos obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 641ec8bc829c1b654df98abd
 *                       name:
 *                         type: string
 *                         example: Curso de Ciencias
 *                       description:
 *                         type: string
 *                         example: Curso enfocado en conceptos básicos de ciencias naturales
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al obtener los cursos
 */







// ----------------- Endpoint POST - /user/course/quedu/generateQuedu -----------------
/**
 * @swagger
 * /user/course/quedu/generateQuedu:
 *   post:
 *     summary: Generar un Quedu basado en un documento subido y preguntas proporcionadas
 *     tags:
 *       - Quedus
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID del usuario que genera el Quedu
 *                 example: 641ec8bc829c1b654df98abc
 *               courseName:
 *                 type: string
 *                 description: Nombre del curso al que pertenece el Quedu
 *                 example: Matemáticas Avanzadas
 *               queduName:
 *                 type: string
 *                 description: Nombre del Quedu a generar
 *                 example: Examen de Integrales
 *               questions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de preguntas para el Quedu
 *                 example: ["¿Qué es una integral?", "Resuelve ∫(2x+3)dx"]
 *               document:
 *                 type: string
 *                 format: binary
 *                 description: Documento subido para la generación del Quedu
 *     responses:
 *       200:
 *         description: Quedu generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: 641ec8bc829c1b654df98abc
 *                 courseName:
 *                   type: string
 *                   example: Matemáticas Avanzadas
 *                 quedus:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Detalles del Quedu generado
 *       400:
 *         description: Solicitud inválida, archivo no proporcionado o tipo no soportado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No se recibió ningún archivo
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No se pudo generar el Quedu
 */







// ----------------- Endpoint POST - /user/course/quedu/new -----------------
/**
 * @swagger
 * /user/course/quedu/createPersonalQuedus:
 *   post:
 *     summary: Crear y agregar Quedus personalizados a un curso de un usuario
 *     tags:
 *       - Quedus
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID del usuario al que se agregarán los Quedus
 *                 example: 641ec8bc829c1b654df98abc
 *               courseName:
 *                 type: string
 *                 description: Nombre del curso al que se agregarán los Quedus
 *                 example: Matemáticas Avanzadas
 *               quedus:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Nombre del Quedu
 *                       example: Examen de Derivadas
 *                     questions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           question:
 *                             type: string
 *                             description: Texto de la pregunta
 *                             example: ¿Qué es una derivada?
 *                           answers:
 *                             type: array
 *                             items:
 *                               type: string
 *                             description: Respuestas a la pregunta
 *                             example: ["Es la tasa de cambio", "Es una operación matemática"]
 *     responses:
 *       201:
 *         description: Quedus creados y agregados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Quedus creados exitosamente
 *                 updatedUser:
 *                   type: object
 *                   description: Información del usuario con los Quedus agregados
 *       400:
 *         description: Solicitud inválida, falta de datos o errores en la validación de los quedus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cada quedu debe tener al menos 1 pregunta.
 *       404:
 *         description: Usuario o curso no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario o curso no encontrado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al crear quedus, Cada quedu debe tener al menos 1 pregunta.
 */






// ----------------- Endpoint POST - /user/course/new -----------------
/**
 * @swagger
 * /user/course/create:
 *   post:
 *     summary: Crear un nuevo curso para un usuario autenticado
 *     tags:
 *       - Cursos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseName:
 *                 type: string
 *                 description: Nombre del curso a crear
 *                 example: Programación en JavaScript
 *     responses:
 *       201:
 *         description: Curso creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Curso creado exitosamente
 *                 course:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: Nombre del curso
 *                         example: Programación en JavaScript
 *       400:
 *         description: Ya existe un curso con ese nombre
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Ya existe un curso con ese nombre
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error interno al crear el curso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error al crear el curso: <detalles del error>
 */






// ----------------- Endpoint GET - /user/:userId/course/:courseId/quedus -----------------
/**
 * @swagger
 * /user/{userId}/course/{courseId}/quedus:
 *   get:
 *     summary: Obtener los Quedus de un curso específico de un usuario
 *     tags:
 *       - Quedus
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID del usuario al que pertenece el curso
 *         schema:
 *           type: string
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: ID del curso al que pertenecen los Quedus
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quedus obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quedus:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       question:
 *                         type: string
 *                         description: Texto de la pregunta del Quedu
 *                         example: "¿Cuál es el resultado de 2 + 2?"
 *                       answers:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["4", "5", "3", "2"]
 *                       correctAnswer:
 *                         type: string
 *                         description: Respuesta correcta
 *                         example: "4"
 *                       successPercentaje:
 *                         type: number
 *                         description: Porcentaje de éxito basado en las respuestas correctas
 *                         example: 80
 *       400:
 *         description: Parámetros requeridos faltantes (userId o courseId)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Faltan parámetros requeridos (userId o courseId)."
 *       404:
 *         description: Usuario o curso no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Usuario no encontrado."
 *       500:
 *         description: Error interno al obtener los Quedus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al obtener los Quedus."
 */






// ----------------- Endpoint GET - /user/:userId/lastQuedus -----------------
/**
 * @swagger
 * /user/{userId}/last-quedu:
 *   get:
 *     summary: Obtener el último Quedu creado por un usuario
 *     tags:
 *       - Quedus
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID del usuario al que pertenecen los Quedus
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Último Quedu obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 question:
 *                   type: string
 *                   description: Texto de la pregunta del Quedu
 *                   example: "¿Cuál es el resultado de 2 + 2?"
 *                 answers:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["4", "5", "3", "2"]
 *                 correctAnswer:
 *                   type: string
 *                   description: Respuesta correcta
 *                   example: "4"
 *                 successPercentaje:
 *                   type: number
 *                   description: Porcentaje de éxito basado en las respuestas correctas
 *                   example: 80
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de creación del Quedu
 *                   example: "2024-11-28T12:34:56Z"
 *       404:
 *         description: Usuario o cursos no encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Usuario o cursos no encontrados."
 *       500:
 *         description: Error interno al obtener el último Quedu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al obtener el último personalQuedu."
 */






// ----------------- Endpoint PUT - /user/quedu/update -----------------
/**
 * @swagger
 * /user/{userId}/quedu/update:
 *   put:
 *     summary: Actualizar los detalles de un Quedu
 *     tags:
 *       - Quedus
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID del usuario al que pertenece el Quedu
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         required: true
 *         description: Datos para actualizar el Quedu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 queduId:
 *                   type: string
 *                   description: ID del Quedu a actualizar
 *                   example: "60d21b3f9b1d8f0a8f5a1c9b"
 *                 solved:
 *                   type: boolean
 *                   description: Estado de resolución del Quedu
 *                   example: true
 *                 successPercentaje:
 *                   type: number
 *                   description: Porcentaje de éxito basado en las respuestas correctas
 *                   example: 80
 *                 attempt:
 *                   type: number
 *                   description: Número de intentos
 *                   example: 1
 *     responses:
 *       200:
 *         description: Quedu actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Quedu actualizado correctamente"
 *                 user:
 *                   type: object
 *                   description: El usuario con el curso actualizado
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d21b3f9b1d8f0a8f5a1c9a"
 *                     courses:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Curso de Matemáticas"
 *                           personalQuedus:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 solved:
 *                                   type: boolean
 *                                   example: true
 *                                 successPercentaje:
 *                                   type: number
 *                                   example: 80
 *                                 attempt:
 *                                   type: number
 *                                   example: 1
 *                                 createdAt:
 *                                   type: string
 *                                   format: date-time
 *                                   example: "2024-11-28T12:34:56Z"
 *       404:
 *         description: Quedu o usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Quedu no encontrado para este usuario"
 *       500:
 *         description: Error interno al actualizar el Quedu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al actualizar el quedu"
 *                 error:
 *                   type: string
 *                   example: "Error de base de datos"
 */







// ----------------- Endpoint PUT - /user/quedu/:userId/:courseId/:queduId -----------------
/**
 * @swagger
 * /user/{userId}/course/{courseId}/quedu/{queduId}:
 *   get:
 *     summary: Obtener un Quedu específico por sus IDs
 *     tags:
 *       - Quedus
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID del usuario al que pertenece el Quedu
 *         schema:
 *           type: string
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: ID del curso que contiene el Quedu
 *         schema:
 *           type: string
 *       - name: queduId
 *         in: path
 *         required: true
 *         description: ID del Quedu que se quiere obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quedu encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 solved:
 *                   type: boolean
 *                   example: true
 *                 successPercentaje:
 *                   type: number
 *                   example: 85
 *                 attempt:
 *                   type: number
 *                   example: 1
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-28T12:34:56Z"
 *       400:
 *         description: Uno o más IDs no son válidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Uno o más IDs no son válidos"
 *       404:
 *         description: Usuario, curso o quedu no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario no encontrado"
 *       500:
 *         description: Error interno al obtener el Quedu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al obtener el quedu."
 *                 error:
 *                   type: string
 *                   example: "Error de base de datos"
 */





// ----------------- Endpoint DELETE - /user/course/delete -----------------
/**
 * @swagger
 * /course/delete:
 *   delete:
 *     summary: Eliminar un curso de un usuario
 *     tags:
 *       - Cursos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID del usuario al que pertenece el curso
 *                 example: "60d21b4667d0d8992e610c85"
 *               courseId:
 *                 type: string
 *                 description: ID del curso que se quiere eliminar
 *                 example: "60d21b4667d0d8992e610c86"
 *     responses:
 *       200:
 *         description: Curso eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Curso eliminado"
 *                 result:
 *                   type: object
 *                   properties:
 *                     modifiedCount:
 *                       type: number
 *                       example: 1
 *       400:
 *         description: Faltan datos necesarios. Asegúrate de enviar userId y courseId.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Faltan datos necesarios. Asegúrate de enviar userId y courseId."
 *       404:
 *         description: Curso no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Curso no encontrado"
 *       500:
 *         description: Error interno del servidor al eliminar el curso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error servidor"
 *                 error:
 *                   type: string
 *                   example: "Error de base de datos"
 */








// ----------------- Endpoint PUT - /user/course/update -----------------
/**
 * @swagger
 * /course/update:
 *   post:
 *     summary: Actualizar el nombre de un curso de un usuario
 *     tags:
 *       - Cursos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID del usuario al que pertenece el curso
 *                 example: "60d21b4667d0d8992e610c85"
 *               courseId:
 *                 type: string
 *                 description: ID del curso que se quiere actualizar
 *                 example: "60d21b4667d0d8992e610c86"
 *               courseName:
 *                 type: string
 *                 description: Nuevo nombre para el curso
 *                 example: "Curso de Matemáticas Avanzadas"
 *     responses:
 *       200:
 *         description: Nombre del curso actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Nombre del curso actualizado correctamente."
 *       400:
 *         description: Faltan datos necesarios. Asegúrate de enviar userId, courseId y courseName.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Faltan datos necesarios. Asegúrate de enviar userId, courseId y courseName."
 *       404:
 *         description: Usuario o curso no encontrado. Verifica los IDs proporcionados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario o curso no encontrado. Verifica los IDs proporcionados."
 *       500:
 *         description: Error interno del servidor al actualizar el nombre del curso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al actualizar el nombre del curso."
 *                 error:
 *                   type: string
 *                   example: "Error de base de datos"
 */







// ----------------- Endpoint GET - /user/allQuedus/:id -----------------
/**
 * @swagger
 * /quedus/{id}:
 *   get:
 *     summary: Obtener todos los quedus de un usuario, formateados por curso
 *     tags:
 *       - Quedus
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario para el cual se van a listar los quedus
 *         schema:
 *           type: string
 *           example: "60d21b4667d0d8992e610c85"
 *     responses:
 *       200:
 *         description: Lista de quedus formateados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   formattedName:
 *                     type: string
 *                     description: Nombre del quedu formateado con el nombre del curso
 *                     example: "Quedu 1 - Curso de Matemáticas"
 *                   courseId:
 *                     type: string
 *                     description: ID del curso al que pertenece el quedu
 *                     example: "60d21b4667d0d8992e610c86"
 *                   queduId:
 *                     type: string
 *                     description: ID del quedu
 *                     example: "60d21b4667d0d8992e610c87"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de creación del quedu
 *                     example: "2024-11-28T10:00:00Z"
 *       400:
 *         description: El ID de usuario no es válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ID de usuario no válido"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario no encontrado"
 *       500:
 *         description: Error al listar todos los quedus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al listar todos los quedus."
 *                 error:
 *                   type: string
 *                   example: "Error de base de datos"
 */

