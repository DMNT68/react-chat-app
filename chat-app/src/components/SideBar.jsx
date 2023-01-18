import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import { SideBarChatItem } from './SideBarChatItem';

export const SideBar = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  return (
    <div>
      <div className="inbox_chat">
        {chatState.usuarios
          .filter((usuario) => usuario.uid != auth.uid)
          .map((usuario) => (
            <SideBarChatItem key={usuario.uid} usuario={usuario} />
          ))}
        <div className="extra_space"></div>
      </div>
    </div>
  );
};
