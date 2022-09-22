import { useState, useEffect } from "react";
import Message from "./message";
import SendBar from "./send-bar";
import Top from "./top";
import uuid from "react-uuid";

const Room = ({ currentUser, socket, friend, db }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const addMessage = async (message) => {
      const newMessages = [
        ...((await db.get("chat", friend.id.toString())) || []),
        message,
      ];
      await db.put("chat", newMessages, friend.id.toString());
      setMessages(newMessages);
    };
    socket.on("message", (message) => {
      addMessage(message);
    });
  }, [socket, friend]);

  const handleSend = (message) => {
    socket.emit("chatMessage", {
      userId: currentUser.id,
      userName: currentUser.name,
      userPhoto: currentUser.photo,
      body: message,
      time: new Date().toLocaleTimeString(),
    });
  };

  return (
    <>
      <Top data={friend} />
      <div
        className="pt-3 pe-3"
        data-mdb-perfect-scrollbar="true"
        style={{ position: "relative", height: "400px", overflowY: "scroll" }}
      >
        {messages.map((message) => (
          <Message
            key={uuid()}
            message={message}
            isMine={message.userId === currentUser.id}
          />
        ))}
      </div>
      <SendBar onSend={handleSend} photo={currentUser.photo} />
    </>
  );
};

export default Room;
