import { Button, Fade, IconButton, Input, Menu, MenuItem, Paper, styled, Modal, Box, CircularProgress } from "@mui/material";
import { ChangeEvent, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { Messages } from "../types/types";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
})

export function Chat() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }

    const messages: Messages[] = [
        { message: "Hola", id: 1 },
        { message: "Hola", id: 2 },
        { message: "Holaaaaaaa", id: 1 },
        { message: "Holaaaaaaa", id: 2 }
    ]

    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [openModal, setOpenModal] = useState(false)
    const handleOpenModal = () => setOpenModal(true)
    const handleCloseModal = () => setOpenModal(false)

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.files) {
            setSelectedFile(e.target.files[0])
            handleOpenModal()
            handleClose()
        }
    }

    const handleUploadImage = async () => {
        if (!selectedFile) return

        const formData = new FormData()
        formData.append('file', selectedFile)
        formData.append('sender', "Tomas")
        formData.append('recipient', "Maya")

        try {
            const response = await axios.post('/messages/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log('Imagen subida con éxito:', response.data)
            setSelectedFile(null)
            handleCloseModal()
        } catch (error) {
            console.error('Error subiendo la imagen', error)
        }
    }

    return (
        <div className="flex flex-col w-full h-full justify-end items-end">
            <div className="w-full">
                {messages.map((message, index) => (
                    <div key={index} className="w-full">
                        {message.id == 1
                            ? (
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
                            ) : (
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
                        <MenuItem>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                sx={{
                                    backgroundColor: "#2563eb",
                                    '&:hover': {
                                        backgroundColor: '#60a5fa',
                                    },
                                    color: "white"
                                }}
                            >
                                Upload file
                                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                            </Button>
                        </MenuItem>
                    </Menu>
                </div>
                <Input disableUnderline type="text" placeholder="type a message" className="w-full" />
                <IconButton >
                    <SendIcon />
                </IconButton>
            </Paper >

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                
            >
                <Box sx={modalStyle}>
                    {selectedFile && (
                        <div className="w-full">
                            {URL.createObjectURL(selectedFile)
                                ? (
                                    <img
                                        className="shadow-2xl"
                                        src={URL.createObjectURL(selectedFile)}
                                        alt="Selected Preview"
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                )
                                : (
                                    <CircularProgress />
                                )
                            }
                            <article className="w-full flex justify-around mt-5">
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    sx={{
                                        backgroundColor: "#2563eb",
                                        '&:hover': {
                                            backgroundColor: '#60a5fa',
                                        },
                                        color: "white"
                                    }}
                                    onClick={handleUploadImage}
                                >
                                    Send
                                </Button>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    color={"error"}
                                    onClick={handleCloseModal}
                                >
                                    Cancel
                                </Button>
                            </article>
                        </div>
                    )}
                </Box>
            </Modal>
        </div >
    );
}
