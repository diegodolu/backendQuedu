const User = require("../models/User");
const axios = require('axios'); 

// ---------------------------------------------- Usuarios ----------------------------------------------

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
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    await user.save();
    res.status(201).send({ user });
  } catch (err) {
    res.status(500).send({ message: "Error al guardar el usuario" });
  }
};

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
const generateQuedu = async (prompt) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo", // o el modelo que desees utilizar
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500, // Ajusta el número de tokens según sea necesario
      temperature: 0.7, // Ajusta la temperatura según tu necesidad
    }, {
      headers: {
        'Authorization': `Bearer YOUR_API_KEY`, // Reemplaza con tu clave de API
        'Content-Type': 'application/json',
      }
    });

    const generatedData = response.data.choices[0].message.content; // Ajusta según la estructura de la respuesta
    const parsedData = JSON.parse(generatedData);    // Parsear el JSON devuelto por la API

    return parsedData; // Devuelve el quedu generado por la IA
  } catch (error) {
    console.error("Error al generar el Quedu:", error);
    throw new Error("No se pudo generar el Quedu"); // Lanza un error si algo falla ---> verificar si sería mejor manejarlo con un return
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



// Crea un Curso ------------------------------------------------------------------------------
const createCourse = async (req, res ) => {
  try {
    const { userId, courseName } = req.body;
    const course = await User.updateOne
    (
      { _id: userId },
      { $push: { courses: { name: courseName } } }
    );

    res.status(201).send({ course });
  }
  catch (error) {
    res.status(500).send({ message: `Error al crear el curso, ${error}` });
  }
};

// Exportar las funciones del controlador
module.exports = {
  getUsers,
  getUserById,
  createUser,
  getRecentPersonalQuedusByUser,
  generateQuedu,
  createQuedu,
  createCourse
};