import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React from "react";
import ImageIcon from '@mui/icons-material/Image';
import { useNavigate } from "react-router-dom";

function UserItem(props) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/chat/${props.id}`);
    };

    return (
        <ListItem button onClick={handleClick}>
            <ListItemAvatar>
                <Avatar>
                    <ImageIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText 
                primary={props.name} 
                secondary={props.email}
            />
        </ListItem>
    );
}

export default UserItem;