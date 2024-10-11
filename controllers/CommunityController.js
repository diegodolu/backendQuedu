const Community = require('../models/Community');

// Conseguir todas las comunidades
function getCommunity(req, res) {
  Community.find({}, (err, community) => {
    if (err) return res.status(500).send({ message: "Error en la petición" });
    if (!community) return res.status(404).send({ message: "No hay comunidades" });
    res.status(200).send({ community });
  });
}