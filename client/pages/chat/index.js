import LeftPannel from "../../components/left-pannel/index";
import RightPannel from "../../components/right-pannel/index";
import io from "socket.io-client";
import { useState } from "react";

const Chat = ({ currentUser, db }) => {
  const socket = io("http://localhost:3001", { transports: ["websocket"] });
  socket.emit("join", currentUser.id);

  const [friend, setFriend] = useState(null);

  const handleChooseFriend = (choosenFriend) => {
    setFriend(choosenFriend);
  };

  return (
    <div className="row">
      <LeftPannel
        currentUser={currentUser}
        onChooseFriend={handleChooseFriend}
        db={db}
      />
      <RightPannel
        currentUser={currentUser}
        socket={socket}
        friend={friend}
        db={db}
      />
    </div>
  );
};

export default Chat;
