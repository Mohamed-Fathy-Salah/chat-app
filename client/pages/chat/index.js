import LeftPannel from "../../components/left-pannel/index";
import RightPannel from "../../components/right-pannel/index";
import io from "socket.io-client";

const Chat = ({ currentUser }) => {
  const socket = io("http://localhost:3001", { transports: ["websocket"] });

  return (
    <div className="row">
      <LeftPannel />
      <RightPannel currentUser={currentUser} socket={socket} />
    </div>
  );
};

export default Chat;
