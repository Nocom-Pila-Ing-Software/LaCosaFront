import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import classes from "./Chat.module.css"

const Chat = ({ roomID, localPlayerInfo, events }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  const [showLogs, setShowLogs] = useState(false)

  useEffect(() => {
    // Create the WebSocket connection only if it hasn't been created yet
    const ws = new W3CWebSocket(`ws://127.0.0.1:8000/room/ws/${roomID}`);
    setSocket(ws);
    console.log("THIS EXECUTES", roomID);
    console.log(events);
    ws.onmessage = (message) => {
      let msg_object = JSON.parse(message.data);

      if (msg_object.type == "message")
        receiveMessage(msg_object);
    };

    return () => {
      // Check if the WebSocket is open before attempting to close it
      ws.close();
    };

  }, [events]);

  const receiveMessage = (message) => setMessages((state) => [message, ...state]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMessage = {
      type: "message",
      msg: message,
      username: localPlayerInfo.playerFound.username,
    };
    setMessage("");
    socket.send(JSON.stringify(newMessage));
  };

  if (!localPlayerInfo) {
    return <div>Loading...</div>; // Add appropriate loading state
  }

  return (

    <form onSubmit={handleSubmit} className={classes.chat}>
      <button onClick={() => setShowLogs(false)}>Chat</button>
      <button onClick={() => setShowLogs(true)}>Logs</button>

      {showLogs ? (
        <ul className={classes["list-of-msg"]}>
          {events.map((log, index) => (
            <li key={index} className={`log ${classes.log}`}>
              {log}
            </li>
          ))}
        </ul>
      ) : (
        <ul className={classes["list-of-msg"]}>
          {messages.slice().reverse().map((message, index) => (
            <li
              key={index}
              className={`message ${(message.username === "Me") ? classes.myMessage : classes.othersMessage}`}
            >
              {message.msg.trim() !== "" ? (
                <>
                  <b>{message.username}</b>: {message.msg}
                </>
              ) : null}
            </li>
          ))}
        </ul>
      )}

      <input
        name="message"
        type="text"
        placeholder="Escribe tu mensaje..."
        autoComplete="off"
        onChange={(e) => setMessage(e.target.value)}
        className=""
        value={message}
        autoFocus
      />
    </form>

  );
};

export default Chat;
