const Ranking = require("../models/Ranking");

function getRanking(req, res) {
  Ranking.find({}, (err, ranking) => {
    if (err) return res.status(500).send({ message: "Error en la petición" });
    if (!ranking) return res.status(404).send({ message: "No hay ranking" });
    res.status(200).send;
  });
}
