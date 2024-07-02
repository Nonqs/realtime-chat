import { Button, Fade, IconButton, Input, Menu, MenuItem, Paper, TextField } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import { Messages } from "../types/types";

export function Chat() {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const messages: Messages[] = [
        { message: "Hola", id: 1 },
        { message: "Hola", id: 2 },
        { message: "Holaaaaaaa", id: 1 },
        { message: "Holaaaaaaa", id: 2 }
    ]

    return (
        <div className="flex flex-col w-full h-full justify-end items-end">
            <div className="w-full">
                {messages.map((message, index) => (
                    <div key={index} className="w-full">
                        {message.id == 1
                            ?
                            (
                                <article className="flex w-auto justify-end">
                                    <Paper className="p-5 m-2"
                                    sx={{
                                        backgroundColor: "#2563eb",
                                        color: "white"
                                    }}
                                    >
                                        <span>{message.message}</span>
                                    </Paper>
                                </article>
                            )
                            :
                            (
                                <article className="flex w-auto justify-start">
                                    <Paper className="p-5 m-2">
                                        <span>{message.message}</span>
                                    </Paper>
                                </article>
                            )
                        }
                    </div>
                ))}
            </div>
            <Paper className="relative flex w-full h-10" square={true} elevation={2}>
                <div>
                    <IconButton
                        className="h-full"
                        id="fade-button"
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <AddIcon />
                    </IconButton>
                    <Menu
                        id="fade-menu"
                        MenuListProps={{
                            'aria-labelledby': 'fade-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </div>
                <Input disableUnderline type="text" placeholder="type a message" className="w-full" />
                <IconButton
                >
                    <SendIcon />
                </IconButton>
            </Paper>
        </div>
    )
}