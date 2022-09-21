import { useState, useEffect } from "react";
import Message from "./message";
import SendBar from "./send-bar";
import Top from "./top";
import uuid from "react-uuid";

const Room = ({ currentUser, socket, friend }) => {
  currentUser = JSON.parse(currentUser);

  const [messages, setMessages] = useState([
    //{
    //userId: currentUser.id,
    //userName: "hi",
    //userPhoto:
    //"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp",
    //body: "wassaaaab",
    //time: new Date().toLocaleTimeString(),
    //},
    //{
    //userId: 2,
    //userName: "my name",
    //userPhoto:
    //"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp",
    //body: "wassaaa",
    //time: new Date().toLocaleTimeString(),
    //},
  ]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [socket]);

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
      <Top photo={friend.photo} />
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
