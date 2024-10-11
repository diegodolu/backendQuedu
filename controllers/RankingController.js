const Ranking = require("../models/Ranking");

const getRanking = async (req, res) => {
  try {
    const ranking = await Ranking.find({});
    if (!ranking) return res.status(404).send({ message: "No hay ranking" });
    res.status(200).send({ ranking });
  } catch (err) {
    res.status(500).send({ message: "Error en la petición" });
  }
};

module.exports = {
  getRanking
};