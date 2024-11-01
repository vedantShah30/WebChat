import React from "react";

function Message({ text, sent, received }) {
    const messageClass = sent ? "sent" : "received";
    
    return (
        <div className={`message ${messageClass}`}>
            <div className="message-bubble">{text}</div>
        </div>
    );
}

export default Message;