import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import { MessageIncoming } from './MessageIncoming';
import { MessageOutgoing } from './MessageOutgoing';
import { SendMessage } from './SendMessage';

export const Messages = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  return (
    <div id="mensajes" className="mesgs">
      <div className="msg_history">{chatState.mensajes.map((msg) => (msg.para === auth.uid ? <MessageIncoming key={msg._id} msg={msg} /> : <MessageOutgoing key={msg._id} msg={msg} />))}</div>

      <SendMessage />
    </div>
  );
};
