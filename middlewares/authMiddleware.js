const jwt = require('jsonwebtoken');

// Middleware para verificar el JWT
function verificarToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1] || req.headers['x-access-token']?.split(' ')[1]; // Token en el encabezado Authorization

  if (!token) {
    return res.status(403).json({ mensaje: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) {
      return res.status(401).json({ mensaje: `Token no válido`});
    }
    req.usuario = usuario; // Guardar los datos del usuario para su uso en la ruta
    next();
  });
}

module.exports = verificarToken;