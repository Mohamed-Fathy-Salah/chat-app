import { useState, useEffect, useRef } from "react";
import Message from "./message";
import SendBar from "./send-bar";
import Top from "./top";
import uuid from "react-uuid";

const Room = ({ currentUser, socket, friend, db }) => {
  const messageEnd = useRef();
  const [messages, setMessages] = useState([]);

  const addMessage = async (message) => {
    if (message.to === message.from) return;
    const newMessages = [
      ...((await db.get("chat", friend.id.toString())) || []),
      message,
    ];
    await db.put("chat", newMessages, friend.id.toString());
    setMessages(newMessages);
  };

  useEffect(() => {
      console.log("socket")
    socket.on("message", (message) => {
      addMessage(message);
    });
  }, [socket]);

  useEffect(() => {
      console.log("friend")
    db.get("chat", friend.id.toString()).then((v) => {
      setMessages(v || []);
    });
  }, [friend]);

  useEffect(() => {
      console.log("message")
    messageEnd.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (body) => {
    const message = {
      from: currentUser.id,
      to: friend.id,
      groupId: null,
      body,
      time: new Date().toLocaleTimeString(),
    };
    socket.emit("chatMessage", message);
    addMessage(message);
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
            isMine={message.from === currentUser.id}
            user={message.from === currentUser.id ? currentUser : friend}
          />
        ))}
        <div ref={messageEnd} />
      </div>
      <SendBar onSend={handleSend} photo={currentUser.photo} />
    </>
  );
};

export default Room;
