import { useState, useEffect, useRef } from "react";
import Message from "./message";
import SendBar from "./send-bar";
import Top from "./top";
import uuid from "react-uuid";

const Room = ({ currentUser, socket, friend, db }) => {
  const messageEnd = useRef();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      addMessage(message, message.from);
    });
    return () => {
      socket.off("message");
    };
  }, [socket]);

  useEffect(() => {
    updateMessages();
  }, [friend]);

  useEffect(() => {
    messageEnd.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = async (message, to) => {
    const newMessages = [
      ...((await db.get(currentUser.id, to)) || []),
      message,
    ];
    await db.put(currentUser.id, newMessages, to);

    if (to === friend.id) {
      await updateMessages();
    }
  };

  const updateMessages = async () => {
    setMessages((await db.get(currentUser.id, friend.id)) || []);
  };

  const handleSend = async (body) => {
    const message = {
      from: currentUser.id,
      to: friend.id,
      groupId: null,
      body,
      time: new Date().toLocaleTimeString(),
    };
    if (message.from !== message.to) socket.emit("chatMessage", message);
    await addMessage(message, message.to);
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
