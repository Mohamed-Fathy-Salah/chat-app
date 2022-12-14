import { useState, useEffect, useRef } from "react";
import Message from "./message";
import SendBar from "./send-bar";
import Top from "./top";
import uuid from "react-uuid";

const Room = ({ currentUser, socket, room, db }) => {
  const messageEnd = useRef();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const update = async (message) => {
      await addMessage(message, message.isGroup ? message.to : message.from);
      // todo : update only if room.id == messae.from but it uses old room for some reason
      await updateMessages();
    };

    socket.on("message", (message) => {
      console.log(message);
      update(message);
    });
    return () => {
      socket.off("messae");
    };
  }, [socket]);

  useEffect(() => {
    updateMessages();
  }, [room]);

  useEffect(() => {
    messageEnd.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isGroup = () => room.email === undefined;

  const addMessage = async (message, to) => {
    const from = message.isGroup ? "g" : "u";
    const newMessages = [...((await db.get(from, to)) || []), message];
    await db.put(from, newMessages, to);
  };

  const updateMessages = async () => {
    const from = isGroup() ? "g" : "u";
    setMessages((await db.get(from, room.id)) || []);
  };

  const handleSend = async (body) => {
    const message = {
      from: currentUser.id,
      to: room.id,
      isGroup: isGroup(),
      body,
      time: new Date().toLocaleTimeString(),
    };
    if (isGroup() || message.from !== message.to)
      socket.emit("chatMessage", message);
    await addMessage(message, message.to);
    await updateMessages();
  };

  return (
    <>
      <Top data={room} />
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
            user={message.from === currentUser.id ? currentUser : room}
          />
        ))}
        <div ref={messageEnd} />
      </div>
      <SendBar onSend={handleSend} photo={currentUser.photo} />
    </>
  );
};

export default Room;
