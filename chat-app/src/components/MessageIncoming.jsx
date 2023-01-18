import React from 'react';
import { horaMes } from '../helpers/horaMes';

export const MessageIncoming = ({ msg }) => {
  return (
    <div className="incoming_msg">
      <div className="incoming_msg_img">
        <img src="https://cdn-icons-png.flaticon.com/512/147/147144.png" alt="sunil" />
      </div>
      <div className="received_msg">
        <div className="received_withd_msg">
          <p>{msg.mensaje}</p>
          <span className="time_date"> {horaMes(msg.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};
