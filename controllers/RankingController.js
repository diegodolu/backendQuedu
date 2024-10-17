const Ranking = require("../models/Ranking");
const User = require("../models/User");

const getRanking = async (req, res) => {
  try {
    const ranking = await Ranking.find({});
    if (!ranking) return res.status(404).send({ message: "No hay ranking" });
    res.status(200).send({ ranking });
  } catch (err) {
    res.status(500).send({ message: "Error en la petición" });
  }
};

const createRanking = async (req, res) => {
  try {
    const { month, ranking } = req.body;

    // Validar que existan ambos campos
    if (!month || !ranking) {
      console.log(req.body);
      return res.status(400).send({ message: "Faltan campos obligatorios" });
    }

    const newRanking = new Ranking({
      month,
      ranking: {
        topContributors: ranking.topContributors,
        topSolvers: ranking.topSolvers
      }
    });

    await newRanking.save();
    res.status(201).send({ ranking: newRanking });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al guardar el ranking" });
  }
};



module.exports = {
  getRanking,
  createRanking
};