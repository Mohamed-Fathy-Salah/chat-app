import LeftPannel from "../../components/left-pannel/index";
import RightPannel from "../../components/right-pannel/index";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { openDB } from "idb";

const Chat = ({ currentUser }) => {
  const socket = io("http://localhost:3001", { transports: ["websocket"] });
  const [friend, setFriend] = useState(null);
  const [db, setDB] = useState();

  const handleChooseFriend = (choosenFriend) => {
    setFriend(choosenFriend);
  };

  useEffect(() => {
    const createDB = async () => {
      try {
        const newDB = await openDB("chat-store", 1, {
          upgrade(db) {
            db.createObjectStore("chat");
          },
        });
        setDB(newDB);
      } catch (e) {
        console.error("---", e);
      }
    };

    createDB();
  }, []);

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
