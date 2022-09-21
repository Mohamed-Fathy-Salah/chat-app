import { useState, useEffect } from "react";
import Message from "./message";
import SendBar from "./send-bar";
import Top from "./top";
import uuid from "react-uuid";

const RightPannel = ({ currentUser, socket }) => {
  currentUser = JSON.parse(currentUser);

  const [messages, setMessages] = useState([
    {
      userId: currentUser.id,
      userName: "hi",
      userPhoto:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp",
      body: "wassaaaab",
      time: new Date().toLocaleTimeString(),
    },
    {
      userId: 2,
      userName: "my name",
      userPhoto:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp",
      body: "wassaaa",
      time: new Date().toLocaleTimeString(),
    },
  ]);

  useEffect(() => {
    socket.on("message", messageListener);

    return () => {
      socket.off("message", messageListener);
    };
  }, []);

  const messageListener = (message) => {
    const newMessages = [...messages];
    newMessages.push(message);
    setMessages(newMessages);
  };

  const handleSend = (message) => {
    socket.emit("chatMessage", {
      userId: currentUser.id,
      userName: currentUser.name,
      userPhoto: currentUser.photo,
      body: message,
      time: new Date().toLocaleTimeString(),
    });

    const newMessages = [...messages];
    newMessages.push({
      userId: currentUser.id,
      userName: currentUser.name,
      userPhoto: currentUser.photo,
      body: message + currentUser,
      time: new Date().toLocaleTimeString(),
    });
    setMessages(newMessages);
  };

  return (
    <div className="col-md-6 col-lg-7 col-xl-8">
      <Top />
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
      <SendBar onSend={handleSend} />
    </div>
  );
};

export default RightPannel;
