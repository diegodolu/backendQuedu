const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importamos las rutas
var user_routes = require('./routes/user'); 
var sharedQuedu_routes = require('./routes/sharedQuedu');
var community_routes = require('./routes/community');
var ranking_routes = require('./routes/ranking');

app.use('/api', user_routes);
app.use('/api', sharedQuedu_routes);
app.use('/api', community_routes);
app.use('/api', ranking_routes);

module.exports = app;