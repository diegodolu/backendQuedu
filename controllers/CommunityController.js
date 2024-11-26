const Community = require('../models/Community');
const SharedQuedu = require('../models/SharedQuedu');
const mongoose = require('mongoose');

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

// Conseguir una comunidad por ID ----------------------------------------------------

const getCommunityById = async (req, res) => {
  try {
    const { communityId } = req.params;
    console.log("Cuerpo de la solicitud:", req.body);

    // Verificar si el ID es válido
    if (!mongoose.Types.ObjectId.isValid(communityId)) {
      return res.status(400).send({ message: "ID de comunidad no es válido." });
    }

    // Buscar la comunidad
    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).send({ message: "No se ha encontrado la comunidad" });
    }

    // Si la comunidad tiene `sharedQuedusIds`, obtener los documentos de `SharedQuedus`
    let sharedQuedus = [];
    if (community.sharedQuedusIds && community.sharedQuedusIds.length > 0) {
      sharedQuedus = await SharedQuedu.find({ _id: { $in: community.sharedQuedusIds } });
    }

    // Responder con la información de la comunidad y los `sharedQuedus` asociados
    res.status(200).send({ community, sharedQuedus });
  } catch (err) {
    console.error("Error al obtener la comunidad:", err);
    res.status(500).send({ message: "Error en la petición" });
  }
};




module.exports = {
  getCommunity,
  createCommunity,
  getCommunityById
};