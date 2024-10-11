var mongoose = require('mongoose');
var app = require('./app');
const connectDB = require('./config/db');

var port = proccess.env.PORT;

// Conectar a la base de datos
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Servidor del api rest escuchando en http://localhost:${port}`);
  });
}).catch((error) => {
  console.error('Error al conectar a la base de datos:', error);
});