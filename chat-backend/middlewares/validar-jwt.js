const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req, res, next) => {
  try {
    const token = req.header('x-token');

    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: 'No hay token en la petición',
      });
    }

    const payload = jwt.verify(token, process.env.JWT_KEY);

    const usuario = await Usuario.findById(payload.uid);

    if (!usuario)
      return res.status(401).json({
        ok: false,
        msg: 'usuario no existe',
      });

    req.uid = payload.uid;

    next();
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: 'token no se válido',
    });
  }
};

module.exports = { validarJWT };
