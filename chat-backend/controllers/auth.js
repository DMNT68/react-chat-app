const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {
  try {
    const { nombre, email, password } = req.body;

    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya existe',
      });
    }

    const usuario = new Usuario(req.body);

    // encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardar usuario en DB
    await usuario.save();

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      msg: 'Usuario creado',
      data: { usuario, token },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Ha ocurrido un error, hable con el administrador',
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuarioDB = await Usuario.findOne({ email });

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Credenciales incorrectas',
      });
    }

    // Validar el password
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Credenciales incorrectas',
      });
    }

    // Generar JWT

    const token = await generarJWT(usuarioDB.id);

    res.json({
      ok: true,
      msg: 'Usuario autenticado',
      data: { usuarioDB, token },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Ha ocurrido un error, hable con el administrador',
    });
  }
};

const renewToken = async (req, res) => {
  try {
    const uid = req.uid;
    
    // Generar un nuevo jwt
    const token = await generarJWT(uid);

    // Obtener el usuario por UID
    const usuario = await Usuario.findById(uid);

    res.json({
      ok: true,
      msg: 'renew',
      data: { usuario, token },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Ha ocurrido un error, hable con el administrador',
    });
  }
};

module.exports = {
  crearUsuario,
  login,
  renewToken,
};
