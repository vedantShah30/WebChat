import React, { useState } from "react";

function MessageInput({ onSendMessage }) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            onSendMessage(inputValue);
            setInputValue('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="message-input">
            <textarea 
                placeholder='Type your message'
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
}

export default MessageInput;