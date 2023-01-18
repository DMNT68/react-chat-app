import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';
import { useSocket } from '../hooks/useSocket';
import { types } from '../types/types';
import { ChatContext } from './chat/ChatContext';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:8080');
  const { dispatch } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth.logged) {
      conectarSocket();
    }
  }, [auth, conectarSocket]);

  useEffect(() => {
    if (!auth.logged) {
      desconectarSocket();
    }
  }, [auth, desconectarSocket]);

  // Escuchar los cambios de los usuarios conectados
  useEffect(() => {
    socket?.on('lista-usuarios', (usuarios) => {
      dispatch({
        type: types.usuariosCargados,
        payload: usuarios,
      });
    });
  }, [socket, dispatch]);

  // Escuchar mensajes
  useEffect(() => {
    socket?.on('mensaje-personal', (mensaje) => {
      dispatch({
        type: types.nuevoMensaje,
        payload: mensaje,
      });
      scrollToBottomAnimated('mensajes');
    });
  }, [socket, dispatch]);

  return <SocketContext.Provider value={{ socket, online }}>{children}</SocketContext.Provider>;
};
