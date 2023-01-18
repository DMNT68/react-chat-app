const { usuarioConectado, usuarioDesconectado, getUsuarios, grabarMensaje } = require('../controllers/sockets');
const { comprobarJWT } = require('../helpers/jwt');

class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on('connection', async (socket) => {
      const [valido, uid] = comprobarJWT(socket.handshake.query['x-token']);

      if (!valido) {
        console.log('socket no identificado');
        return socket.disconnect();
      }

      const usuario = await usuarioConectado(uid);
      const date = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getUTCMinutes()}`;
      console.log('cliente conectado', usuario.nombre, uid, date);

      // Unir al usuario a una sala de socket.io
      socket.join(uid);

      this.io.emit('lista-usuarios', await getUsuarios());

      socket.on('mensaje-personal', async (payload) => {
        const mensaje = await grabarMensaje(payload);
        this.io.to(payload.para).emit('mensaje-personal', mensaje);
        this.io.to(payload.de).emit('mensaje-personal', mensaje);
      });

      socket.on('disconnect', async () => {
        const date = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`;
        console.log('cliente desconectado', usuario.nombre, uid, date);
        await usuarioDesconectado(uid);
        this.io.emit('lista-usuarios', await getUsuarios());
      });
    });
  }
}

module.exports = Sockets;
