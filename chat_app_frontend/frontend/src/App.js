import React from 'react';
import { BrowserRouter, Routes, Route, Navigate as NavigateRedirect } from "react-router-dom";
import Register from './Components/Register';
import Login from './Components/Login';
import Navigate from './Components/Navigate';
import ChatArea from './Components/ChatArea';
import Sidebar from './Components/Sidebar';
import './App.css';
import withAuthentication from './utils/withAuthentication';

// Layout component for chat interface
const ChatLayout = withAuthentication(({ children }) => {
  return (
    <div className="chat-container">
      <Sidebar />
      <Routes>
        <Route index element={<div className="select-chat-message">Select a user to start chatting</div>} />
        <Route path=":userId" element={<ChatArea />} />
      </Routes>
    </div>
  );
});

function App() {
  return (
    <BrowserRouter>
      <Navigate />
      <Routes>
        <Route path="/" element={<NavigateRedirect to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat/*" element={<ChatLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;