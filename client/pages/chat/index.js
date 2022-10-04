import LeftPannel from "../../components/left-pannel/index";
import RightPannel from "../../components/right-pannel/index";
import io from "socket.io-client";
import { useState } from "react";

const Chat = ({ currentUser, db }) => {
  const socket = io("http://localhost:3001", { transports: ["websocket"] });
  socket.emit("join", currentUser.id);

  const [room, setRoom] = useState(null);

  const handleChooseRoom = (choosenFriend) => {
    setRoom(choosenFriend);
  };

  return (
    <div className="row">
      <LeftPannel
        currentUser={currentUser}
        onChooseRoom={handleChooseRoom}
        db={db}
      />
      <RightPannel
        currentUser={currentUser}
        socket={socket}
        room={room}
        db={db}
      />
    </div>
  );
};

export default Chat;
