import {
  Button,
  Fade,
  IconButton,
  Input,
  Menu,
  Modal,
  MenuItem,
  Paper,
  styled,
  Box,
  CircularProgress,
} from "@mui/material";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { ChatMessages, Messages } from "../types/types";
import CONST from "../services/config.d";
import { useUserContext } from "../context/UserActiveContext";
import { io } from "socket.io-client";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export function Chat() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useUserContext();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessages[]>([]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "20px",
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
      handleOpenModal();
      handleClose();
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      const response = await axios.get(
        `${CONST.API_CONSTANTS.BACKEND_URL}/messages`,
        { withCredentials: true }
      );

      const data = response.data;
      setChatMessages(data);
    };

    getMessages();
  }, []);

  const handleUploadImage = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("sender", user);
    formData.append("recipient", user == "Tomas" ? "Maya" : "Tomas");
    try {
      const response = await axios.post(
        `${CONST.API_CONSTANTS.BACKEND_URL}/messages/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log("Imagen subida con éxito:", response.data);
      setSelectedFile(null);
      handleCloseModal();
    } catch (error) {
      console.error("Error subiendo la imagen", error);
    }
  };

  const socket = useMemo(
    () =>
      io(CONST.API_CONSTANTS.BACKEND_URL, {
        withCredentials: true, // Esto asegura que las cookies se envíen con la solicitud
      }),
    []
  );

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conectado al servidor WebSocket");
    });

    socket.on("message", (data: ChatMessages) => {
      console.log("Mensaje recibido del servidor:", data);
      setChatMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("disconnect", () => {
      console.log("Desconectado del servidor WebSocket");
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleUploadMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;

    const newMessage: ChatMessages = {
      _id: new Date().toISOString(), // Usa un identificador único real en producción
      message,
      recipient: user === "Tomas" ? "Maya" : "Tomas",
      sender: user,
      timestamp: new Date().toISOString(),
      type: "text",
    };

    socket.emit("message", newMessage);

    // Actualizar el estado local inmediatamente
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);

    setMessage("");
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col w-full h-full justify-end items-end">
      <div className="w-full">
        {chatMessages.map((message, index) => (
          <div key={index} className="w-full">
            {message.sender == user ? (
              <article className="flex w-auto justify-end">
                <Paper
                  className="p-5 m-2 relative"
                  sx={{
                    backgroundColor: "#fafaf9",
                    color: "black",
                  }}
                >
                  <span>{message.message}</span>
                  <small className="absolute bottom-1 right-1 text-xs">
                    {formatTime(message.timestamp)}
                  </small>
                </Paper>
              </article>
            ) : (
              <article className="flex w-auto justify-start">
                <Paper className="relative p-5 m-2" sx={{
                    backgroundColor: "#0c0a09",
                    color: "white",
                  }}>
                  <span>{message.message}</span>
                  <small className="absolute bottom-1 right-1 text-xs">
                    {formatTime(message.timestamp)}
                  </small>
                </Paper>
              </article>
            )}
          </div>
        ))}
      </div>
      <Paper className="relative flex w-full h-10" square={true} elevation={2}>
        <div>
          <IconButton
            className="h-full"
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <AddIcon />
          </IconButton>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
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
                  backgroundColor: "#0c0a09",
                  "&:hover": {
                    backgroundColor: "#a8a29e",
                  },
                  color: "white",
                }}
              >
                Upload file
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
              </Button>
            </MenuItem>
          </Menu>
        </div>
        <form onSubmit={handleUploadMessage} className="flex w-full">
          <Input
            disableUnderline
            type="text"
            placeholder="type a message"
            className="w-full"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
          />
          <IconButton onClick={handleUploadMessage}>
            <SendIcon />
          </IconButton>
        </form>
      </Paper>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {selectedFile && (
            <div className="w-full">
              {URL.createObjectURL(selectedFile) ? (
                <img
                  className="shadow-2xl"
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected Preview"
                  style={{ width: "100%", height: "auto" }}
                />
              ) : (
                <CircularProgress />
              )}
              <article className="w-full flex justify-around mt-5">
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  className="w-1/3"
                  tabIndex={-1}
                  sx={{
                    backgroundColor: "#0c0a09",
                    "&:hover": {
                      backgroundColor: "#a8a29e",
                    },
                    color: "white",
                  }}
                  onClick={handleUploadImage}
                >
                  Send
                </Button>
                <Button
                  component="label"
                  role={undefined}
                  className="w-1/3"
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
    </div>
  );
}
