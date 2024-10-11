const SharedQuedu = require('../models/SharedQuedu');

// Conseguir todos los SharedQuedus
const getSharedQuedus = async (req, res) => {
  try {
    const sharedQuedus = await SharedQuedu.find({});
    if (!sharedQuedus) return res.status(404).send({ message: "No hay sharedQuedus" });
    res.status(200).send({ sharedQuedus });
  } catch (err) {
    res.status(500).send({ message: "Error en la petición" });
  }
};

module.exports = {
  getSharedQuedus
};