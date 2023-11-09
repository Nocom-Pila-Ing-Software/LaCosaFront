import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const Chat = ({ localPlayerInfo }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!localPlayerInfo) {
      return; // Add some error handling or a loading state if necessary
    }

    const { playerFound } = localPlayerInfo;
    const ws = io(`ws://localhost:8000/room/ws/${playerFound.playerID}`);
    setSocket(ws);
    ws.on("message", receiveMessage);

    return () => {
      ws.off("message", receiveMessage);
    };
  }, [localPlayerInfo]);

  const receiveMessage = (message) => setMessages((state) => [message, ...state]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMessage = {
      msg: message,
      username: localPlayerInfo.playerFound.username,
    };
    setMessages((state) => [newMessage, ...state]);
    setMessage("");
    socket.emit("message", newMessage);
  };

  if (!localPlayerInfo) {
    return <div>Loading...</div>; // Add appropriate loading state
  }

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
      <h1 className="text-2xl font-bold my-2">Chat React</h1>
      <input
        name="message"
        type="text"
        placeholder="Write your message..."
        onChange={(e) => setMessage(e.target.value)}
        className="border-2 border-zinc-500 p-2 w-full text-black"
        value={message}
        autoFocus
      />

      <ul className="h-80 overflow-y-auto">
        {messages.map((message, index) => (
          <li
            key={index}
            className={`my-2 p-2 table text-sm rounded-md ${
              message.username === "Me" ? "bg-sky-700 ml-auto" : "bg-black"
            }`}
          >
            <b>{message.username}</b>: {message.msg}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default Chat;
