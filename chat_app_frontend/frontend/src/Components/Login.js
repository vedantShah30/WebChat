import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login() {
    const BASE_URL = "http://127.0.0.1:8000/";
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        "email": "",
        "password": "",
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Store token in cookie
                document.cookie = `token=${data.token}; path=/`;
                // Store user data in localStorage for easy access
                localStorage.setItem('user', JSON.stringify(data.user));
                // Navigate to chat
                navigate('/chat');
            } else {
                // Handle login error
                alert(data.error || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <div className="container text-center">
            <form onSubmit={handleFormSubmit}>  
                <div className="mt-3">
                    <TextField
                        id="email"
                        type="email"
                        label="Email"
                        variant="outlined"
                        onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                </div>
                <div className="mt-3">
                    <TextField
                        id="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        onChange={e => setFormData({...formData, password: e.target.value})}
                    />
                </div>
                <div className="mt-3">
                    <Button variant="contained" type="submit">Login</Button>
                </div>
            </form>
        </div>
    );
}

export default Login;