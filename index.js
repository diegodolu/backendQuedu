require('dotenv').config(); // Cargar las variables de entorno
var app = require('./app');
const connectDB = require('./config/db');

var port = process.env.PORT || 3000; // Asegúrate de que PORT esté definido

// Conectar a la base de datos
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Servidor del api rest escuchando en http://localhost:${port}`);
  });
}).catch((error) => {
  console.error('Error al conectar a la base de datos:', error);
});

// Ruta para la raíz
app.get('/', (req, res) => {
  res.send('API is running...');
});