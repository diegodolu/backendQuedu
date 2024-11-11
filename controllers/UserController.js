const User = require("../models/User");
const SharedQuedu = require("../models/SharedQuedu");
const Community = require("../models/Community");
const axios = require('axios'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const pdfParse = require('pdf-parse');
const fs = require('fs');

const { generatePrompt } = require('../controllers/generarPromptController');

// ---------------------------------------------- Usuarios ----------------------------------------------

// Configuración de multer para almacenar archivos --------------------------------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Conseguir todos los usuarios --------------------------------------------------
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) return res.status(404).send({ message: "No hay usuarios" });
    res.status(200).send({ users });
  } catch (err) {
    res.status(500).send({ message: "Error en la petición" });
  }
}

// Conseguir datos de un usuario en específico -----------------------------------
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ message: "El usuario no existe" });
    res.status(200).send({ user });
  } catch (error) {
    res.status(500).send({ message: "Error en la petición" });
  }
};

// Crear un usuario --------------------------------------------------------------
const createUser = async (req, res) => {
  try {
    const user = new User();

    const saltRounds = 10;  // Número de rondas para generar el hash
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    user.username = req.body.username;
    user.password = hashedPassword;
    user.email = req.body.email;
    await user.save();
    res.status(201).send({ user });
  } catch (err) {
    res.status(500).send({ message: "Error al guardar el usuario" });
  }
};

// Iniciar sesión de un usuario ---------------------------------------------------

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Contraseña incorrecta" });
    }


    const token = jwt.sign(
      { _id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { algorithm: 'HS256', expiresIn: '1h' }
    );




    res.status(200).send({ message: "Inicio de sesión exitoso", user, token });

  } catch (error) {
    res.status(500).send({ message: `Error al iniciar sesión ${error}` });
  }
}

// ---------------------------------------------- Quedus ----------------------------------------------

// Conseguir los 4 quedus más recientes de un usuario en específico ----------------------------
const getRecentPersonalQuedusByUser = async (userId) => {
  try {
    const user = await User.findById(userId, {
      "courses._id": 1,
      "courses.name": 1,
      "courses.personalQuedus": { $slice: -4 },
      "courses.personalQuedus.name": 1,  
      "courses.personalQuedus.createdAt": 1
    });

    if (!user) {
      return { message: "Usuario no encontrado" };
    }

    return user.courses;
  } catch (err) {
    console.error("Error al obtener los cursos y tests:", err);
    return { message: "Error en la consulta" };
  }
};

// Generar Quedu con IA -----------------------------------------------------------------------
const generateQuedu = async (req, res) => {
  try {

    const { userId, course, queduName, questions } = req.body;
    const documentFile = req.file;
    console.log("Datos recibidos:");
    console.log("Archivo recibido:", documentFile);
    console.log("queduName:", queduName);
    console.log("questions:", questions);

    const filePath = documentFile.path;

    const dataBuffer = await fs.promises.readFile(filePath);
    const pdfData = await pdfParse(dataBuffer)
    const extractedText = pdfData.text;

    console.log("Texto extraído del PDF: ", extractedText);

    const fechaCreacion = new Date().toISOString().split('T')[0];
    const generatedPrompt = generatePrompt(extractedText, questions, queduName, fechaCreacion);

    // Llama a la API de OpenAI para generar el Quedu
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-4o-mini-2024-07-18",
      messages: [{ role: "user", content: generatedPrompt }],
      max_tokens: 11000,
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer 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`, // Reemplaza con tu clave de API
        'Content-Type': 'application/json',
      }
    });

    console.log("Respuesta de la API:", response.data); 

    const generatedData = response.data.choices[0].message.content;

    // Limpiar el contenido del formato Markdown
    const jsonString = generatedData
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    console.log('JSON a parsear:', jsonString);

    let parsedData;
    try {
      // Parsear el JSON devuelto por la API
      parsedData = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("Error al analizar JSON:", parseError);
      // Devuelve el contenido limpio sin analizar
      return res.json({ content: jsonString });
    }

    // Devuelve el JSON generado con la API
    return res.json(parsedData);
  } catch (error) {
    console.error("Error al generar el Quedu:", error);
    return res.status(500).json({ error: "No se pudo generar el Quedu" });
  }
};


// Crear un Quedu ------------------------------------------------------------------------------
const createQuedu = async ({ userId, course, name, questions }) => {
  try {
    // Crear un nuevo personalQuedu en la base de datos
    const queduData = {
      name,
      successPercentaje: 100, // O un valor que determines
      attempt: 1, // O el número de intentos
      questions,
      solvedBy: [userId], // Opcional, dependiendo de tu lógica
    };

    const quedu = await User.updateOne(
      { _id: userId, "courses.name": course },
      { $push: { "courses.$.personalQuedus": queduData } }
    );

    return quedu; // Devuelve el quedu creado
  } catch (error) {
    console.error("Error al crear el Quedu:", error);
    throw new Error("No se pudo crear el Quedu"); // Lanza un error si algo falla
  }
};

// Añadir la función recibe file ------------------------------------------------------------------------------
//const recibeFile = async (req, res) => {
//  try {
//    const { userId, course, queduName, questions } = req.body;
//    const documentFile = req.file;
//
//    console.log("Datos recibidos:");
//    console.log("userId: ", userId);
//    console.log("course: ", course);
//    console.log("queduName: ", queduName);
//    console.log("questions: ", questions);
//    console.log("Archivo recibido: ", documentFile);
//
//    const filePath = documentFile.path;
//
//    const dataBuffer = await fs.promises.readFile(filePath);
//    const pdfData = await pdfParse(dataBuffer)
//    const extractedText = pdfData.text;
//
//    console.log("Texto extraído del PDF: ", extractedText);
//
//    res.status(200).send({ message: 'Datos recibidos y texto extraído correctamente', extractedText });
//  } catch (error) {
//    console.error("Error al crear el Quedu con archivo: ", error);
//    res.status(500).send({ message: "Error al recibir datos" });
//  }
//}

// Crear un Quedu para Postman ----------------------------------------------------------------

const createPersonalQuedus = async (req, res) => {
  try {
    const { userId, courseName, quedus } = req.body;

    // Valida y ajusta el successPercentaje basado en las respuestas correctas
    const updatedQuedus = quedus.map(quedu => {
      // Validar que haya al menos 2 preguntas
      if (quedu.questions.length < 2) {
        throw new Error("Cada quedu debe tener al menos 2 preguntas.");
      }

      quedu.attempt = 1;
      quedu.solved = true;

      quedu.questions.forEach(question => {
        // Asegurarse de que cada pregunta tenga al menos 5 respuestas
        if (question.answers.length < 5) {
          throw new Error("Cada pregunta debe tener al menos 5 respuestas.");
        }
      });

      // Calcular el porcentaje de éxito en función de las respuestas correctas
      const totalQuestions = quedu.questions.length;
      const correctAnswers = quedu.questions.flatMap(q => q.answers).filter(a => a.correct).length;
      const percentageSteps = [0, 20, 40, 60, 80, 100]; // Posibles valores de successPercentaje
      const successPercentage = percentageSteps[Math.floor((correctAnswers / (totalQuestions * 5)) * 5)];
      quedu.successPercentaje = successPercentage;

      return quedu;
    });

    // Actualiza el usuario y agrega los Quedus personalizados al curso
    const updatedUser = await User.updateOne(
      { _id: userId, "courses.name": courseName },
      { $push: { "courses.$.personalQuedus": { $each: updatedQuedus } } },
      { new: true }
    );

    if (updatedUser.nModified === 0) {
      return res.status(404).send({ message: "Usuario o curso no encontrado" });
    }

    res.status(201).send({ message: "Quedus creados exitosamente", updatedUser });
  } catch (error) {
    res.status(500).send({ message: `Error al crear quedus, ${error.message}` });
  }
};


// Crea un Curso -----------------------------------------------------------------
const createCourse = async (req, res) => {
  try {
    const { courseName } = req.body;

    // Usa el ID del usuario autenticado desde el middleware
    const userId = req.usuario._id;
    // console.log("User ID obtenido del token:", userId);

    // Verifica si el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Verifica si ya existe un curso con el mismo nombre para este usuario
    const courseExists = user.courses.some(course => course.name === courseName);
    if (courseExists) {
      return res.status(400).json({ mensaje: 'Ya existe un curso con ese nombre' });
    }

    // Agrega el nuevo curso
    user.courses.push({ name: courseName });
    await user.save();

    res.status(201).json({ mensaje: 'Curso creado exitosamente', course: user.courses });
  } catch (error) {
    console.error("Error al crear el curso:", error);
    res.status(500).json({ mensaje: `Error al crear el curso: ${error.message}` });
  }
};

// ---------------------------------------------- Sucribirse a Comunidad ----------------------------------------------

// Suscribirse a una comunidad ---------------------------------------------------------
const subscribeToCommunity = async (req, res) => {
  try {
    const { userId, communityId } = req.body;
    const user = await User.updateOne(
      { _id: userId },
      { $push: { communityIds: communityId } }
    );

    res.status(201).send({ user });
  }
  catch (error) {
    res.status(500).send({ message: `Error al suscribirse a la comunidad, ${error}` });
  }
}




// ---------------------------------------------- Compartir Quedus ----------------------------------------------

// Usuario comparte un Quedu en una comunidad

const sharePersonalQuedu = async (req, res) => {
  const { userId, personalQueduId, communityId } = req.body;

  try {
    // 1. Buscar al usuario que comparte el personalQuedu
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // 2. Buscar el personalQuedu en el array de cursos del usuario
    let personalQuedu;
    let courseIndex, queduIndex;

    for (let i = 0; i < user.courses.length; i++) {
      const course = user.courses[i];
      const quedu = course.personalQuedus.id(personalQueduId);
      if (quedu) {
        personalQuedu = quedu;
        courseIndex = i;
        queduIndex = course.personalQuedus.indexOf(quedu);
        break;
      }
    }

    if (!personalQuedu) {
      return res.status(404).json({ message: "personalQuedu no encontrado" });
    }

    // 3. Crear un nuevo documento de SharedQuedu basado en el personalQuedu
    const sharedQuedu = new SharedQuedu({
      name: personalQuedu.name,
      successPercentaje: personalQuedu.successPercentaje,
      attempt: personalQuedu.attempt,
      createdAt: personalQuedu.createdAt,
      solvedBy: [], // Inicialmente vacío
      questions: personalQuedu.questions,
    });

    // Guardar el nuevo SharedQuedu en la base de datos
    await sharedQuedu.save();

    // 4. Agregar el SharedQuedu a la comunidad
    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ message: "Comunidad no encontrada" });
    }

    // Agregar el nuevo SharedQuedu a la comunidad
    community.sharedQuedusIds.push(sharedQuedu._id);
    community.numberOfQuedus += 1; // Aumentar el número de quedus
    await community.save();

    // 5. Eliminar el personalQuedu de la lista del usuario
    user.courses[courseIndex].personalQuedus.splice(queduIndex, 1);

    // 6. Agregar el ID del SharedQuedu al campo `sharedQuedusIds` del curso del usuario
    user.courses[courseIndex].sharedQuedusIds.push(sharedQuedu._id);

    // Guardar los cambios en el usuario
    await user.save();

    // Respuesta exitosa
    return res.status(200).json({ message: "personalQuedu compartido exitosamente" });

  } catch (error) {
    console.error("Error compartiendo el personalQuedu:", error.message);
    return res.status(500).json({ message: "Error compartiendo el personalQuedu" });
  }
};



// Exportar las funciones del controlador
module.exports = {
  loginUser,
  getUsers,
  getUserById,
  createUser,
  getRecentPersonalQuedusByUser,
  generateQuedu,
  createQuedu,
  createCourse,
  createPersonalQuedus,
  subscribeToCommunity,
  sharePersonalQuedu,
  upload
};