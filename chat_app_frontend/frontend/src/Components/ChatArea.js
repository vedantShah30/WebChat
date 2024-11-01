import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Message from "./Message";
import MessageInput from "./MessageInput";
import withAuthentication from "../utils/withAuthentication";

function ChatArea() {
    const [messages, setMessages] = useState([]);
    const websocketRef = useRef(null); // Use useRef instead of useState for WebSocket
    const messagesEndRef = useRef(null);
    const { userId } = useParams();
    const currentUser = JSON.parse(localStorage.getItem('user'));

    const getAuthTokenFromCookie = () => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith('token=')) {
                return cookie.substring(6);
            }
        }
        return null;
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Reset messages when switching users
    useEffect(() => {
        setMessages([]);
    }, [userId]);

    useEffect(() => {
        // Close existing WebSocket connection if it exists
        if (websocketRef.current) {
            websocketRef.current.close();
        }

        const token = getAuthTokenFromCookie();
        if (token && userId) {
            const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${userId}/?token=${token}`);

            ws.onopen = () => {
                console.log('WebSocket Connected');
            };

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                const isCurrentUser = parseInt(data.sender_id) === parseInt(currentUser.id);
                
                setMessages(prevMessages => [...prevMessages, {
                    text: data.message,
                    sent: isCurrentUser,
                    received: !isCurrentUser
                }]);
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            ws.onclose = () => {
                console.log('WebSocket Disconnected');
            };

            // Store WebSocket instance in ref
            websocketRef.current = ws;

            return () => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.close();
                }
            };
        }
    }, [userId, currentUser.id]); // Remove websocket dependency

    const sendMessage = (message) => {
        if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
            websocketRef.current.send(JSON.stringify({
                message: message
            }));
        }
    };

    return (
        <div className="chat-area">
            <div className="chat-header">
                <h2>Chat</h2>
            </div>
            <div className="messages">
                {messages.map((message, index) => (
                    <Message 
                        key={index}
                        text={message.text}
                        sent={message.sent}
                        received={message.received}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <MessageInput onSendMessage={sendMessage} />
        </div>
    );
}

export default withAuthentication(ChatArea);
