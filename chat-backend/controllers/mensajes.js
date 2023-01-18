const Mensaje = require('../models/mensaje');

const obtenerChat = async (req, res) => {
  try {
    const miId = req.uid;
    const mensajesDe = req.params.de;

    const ultimos30 = await Mensaje.find({
      $or: [
        { de: miId, para: mensajesDe },
        { de: mensajesDe, para: miId },
      ],
    })
      .sort({ createdAt: 'asc' })
      .limit(30);

    res.json({
      ok: true,
      msg: 'mensajes',
      data: ultimos30,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Ha ocurrido un error, hable con el administrador',
    });
  }
};

module.exports = { obtenerChat };
