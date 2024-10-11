const SharedQuedu = require('../models/SharedQuedu');

SharedQuedu.find({},(err, sharedQuedu) => {
    if (err) return res.status(500).send({ message: "Error en la petición" });
    if (!sharedQuedu) return res.status(404).send({ message: "No hay sharedQuedu" });
    res.status(200).send({ sharedQuedu });
})