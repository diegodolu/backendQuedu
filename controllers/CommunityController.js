const Community = require('../models/Community');

// Conseguir todas las comunidades --------------------------------------------------
const getCommunity = async (req, res) => {
  try {
    const community = await Community.find({});
    if (!community) return res.status(404).send({ message: "No hay comunidades" });
    res.status(200).send({ community });
  } catch (err) {
    res.status(500).send({ message: "Error en la petición" });
  }
};

// Crear una comunidad --------------------------------------------------------------
const createCommunity = async (req, res) => {
  try {
    const community = new Community();
    community.name = req.body.name;
    community.numberOfQuedus = req.body.numberOfQuedus;
    community.image = req.body.image;
    await community.save();
    res.status(201).send({ community });
  } catch (err) {
    res.status(500).send({ message: "Error al guardar la comunidad" });
  }
};

module.exports = {
  getCommunity,
  createCommunity
};