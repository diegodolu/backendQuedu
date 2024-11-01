const express = require('express');
const app = express();
const verificarToken = require('./middlewares/authMiddleware');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importamos las rutas
var user_routes = require('./routes/user'); 
var sharedQuedu_routes = require('./routes/sharedQuedu');
var community_routes = require('./routes/community');
var ranking_routes = require('./routes/ranking');

app.use('/api', user_routes);
app.use('/api', verificarToken, sharedQuedu_routes);
app.use('/api', verificarToken, community_routes);
app.use('/api', verificarToken, ranking_routes);

module.exports = app;