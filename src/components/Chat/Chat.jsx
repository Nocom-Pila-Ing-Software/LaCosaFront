import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const Chat = ({ roomID, localPlayerInfo }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Create the WebSocket connection only if it hasn't been created yet
        const ws = new W3CWebSocket(`ws://127.0.0.1:8000/room/ws/${roomID}`);
        setSocket(ws);
        console.log("THIS EXECUTES", roomID);

        ws.onmessage = (message) => {
            msg_object = JSON.parse(message.data);
            if (msg_object.type == "message")
                receiveMessage(msg_object);
        };
        return () => {
            // Check if the WebSocket is open before attempting to close it
            ws.close();
        };

    }, []);

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
                        className={`my-2 p-2 table text-sm rounded-md ${message.username === "Me" ? "bg-sky-700 ml-auto" : "bg-black"
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
