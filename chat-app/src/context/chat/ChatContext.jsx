import { createContext, useReducer } from 'react';
import { chatReducer } from './chatReducer';

export const ChatContext = createContext();

const initialState = {
  uid: '',
  chatActivo: null, //UID del usuario al yo quiero enviar mensajes
  usuarios: [], // Todos los usuario de la BD
  mensajes: [], // EL Chat seleccionado
};

export const ChatProvider = ({ children }) => {
  const [chatState, dispatch] = useReducer(chatReducer, initialState);

  return <ChatContext.Provider value={{ chatState, dispatch }}>{children}</ChatContext.Provider>;
};
