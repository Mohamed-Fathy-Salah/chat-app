import LeftPannel from "../../components/left-pannel/index";
import RightPannel from "../../components/right-pannel/index";
import io from "socket.io-client";
import { useState } from "react";

const Chat = ({ currentUser }) => {
  const socket = io("http://localhost:3001", { transports: ["websocket"] });
  const [friend, setFriend] = useState(null);

  const handleChooseFriend = (choosenFriend) => {
    setFriend(choosenFriend);
  };

  return (
    <div className="row">
      <LeftPannel onChooseFriend={handleChooseFriend} />
      <RightPannel currentUser={currentUser} socket={socket} friend={friend} />
    </div>
  );
};

export default Chat;
