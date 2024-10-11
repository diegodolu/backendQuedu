const Community = require('../models/Community');

// Conseguir todas las comunidades
const getCommunity = async (req, res) => {
  try {
    const community = await Community.find({});
    if (!community) return res.status(404).send({ message: "No hay comunidades" });
    res.status(200).send({ community });
  } catch (err) {
    res.status(500).send({ message: "Error en la petición" });
  }
};

module.exports = {
  getCommunity
};