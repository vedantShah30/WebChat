import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, LinearProgress, List } from "@mui/material";
import UserItem from "./UserItem";

function Sidebar() {
    const BASE_URL = `http://127.0.0.1:8000/`;
    const [userList, setUserList] = useState([]);
    const [userLoader, setUserLoader] = useState(true);

    const getAuthTokenFromCookie = () => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const [name, value] = cookie.trim().split('=');
            if (name === 'token') {
                return value;
            }
        }
        return null;
    };

    useEffect(() => {
        const authToken = getAuthTokenFromCookie();

        if (authToken) {
            axios.get(`${BASE_URL}api/users/`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })
            .then(response => {
                setUserList(response.data);
                setUserLoader(false)
            })
            .catch(error => {
                console.error("Error making API request:", error.response || error);
            });
        } else {
            console.log("No auth token found");
        }
    }, []);

    return (
        <div className="sidebar">
            {userLoader ? (<Box sx={{width: '100%'}}>
                <LinearProgress />
            </Box>):
            (<List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                {userList.map((user, index) => (
                    <UserItem key = {index} email = {user.email} name={`${user.first_name} ${user.last_name}`} id = {user.id} />
                ))}
            </List>)
            }
        </div>
    );
}

export default Sidebar;