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
import { ChangeEvent, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { ChatMessages } from "../types/types";
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

export function Chat({ chat }: { chat: string }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useUserContext();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessages[]>([]);

  const socket = io(CONST.API_CONSTANTS.BACKEND_URL, {
    withCredentials: true,
    transports: ["websocket"],
  });

  useEffect(() => {
    socket.on("connect", () => {});

    socket.on("message", (data: ChatMessages) => {
      console.log("Mensaje recibido del servidor:", data);
      console.log(data);
      setChatMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("uploadStatus", (data: ChatMessages) => {
      setOpenModal(false)
      setChatMessages((prevMessages) => [...prevMessages, data])
    });

    socket.on("disconnect", () => {});

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    const getMessages = async () => {
      const response = await axios.get(
        `${CONST.API_CONSTANTS.BACKEND_URL}/messages/${chat}`,
        { withCredentials: true }
      );

      const data = response.data;
      setChatMessages(data);
    };

    getMessages();
  }, [chat]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
      handleOpenModal();
      handleClose();
    }
  };

  const handleUploadImage = async () => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const buffer = new Uint8Array(arrayBuffer);

      socket.emit(
        "uploadImage",
        {
          recipient: chat,
          sender: user,
          file: buffer,
        },
        (status: { message: string }) => {}
      );
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleUploadMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;

    const newMessage: ChatMessages = {
      _id: new Date().toISOString(), 
      message,
      recipient: chat,
      sender: user,
      timestamp: new Date().toISOString(),
      type: "text",
    };

    socket.emit("message", {
      message,
      recipient: chat,
      sender: user,
    });

    setChatMessages((prevMessages) => [...prevMessages, newMessage]);

    setMessage("");
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full overflow-auto flex flex-col items-center h-full justify-end ">
        <div className="w-64 h-10 absolute z-10 bg-white mt-5 rounded-xl flex justify-center items-center top-0">
            <span className="font-semibold text-black">@{chat}</span>
        </div>
        {chatMessages.map((message, index) => (
          <div key={index} className="w-full">
            {message.sender == user ? (
              <article className="flex w-auto justify-end">
                {message.type === "text" ? (
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
                ) : (
                  <Paper
                    className="p-2 m-2 relative"
                    sx={{
                      backgroundColor: "#fafaf9",
                      color: "black",
                    }}
                  >
                    <img className="w-96" src={message.message} alt="" />
                    <small className="absolute bottom-1 right-1 text-xs">
                      {formatTime(message.timestamp)}
                    </small>
                  </Paper>
                )}
              </article>
            ) : (
              <article className="flex w-auto justify-start">
                {message.type === "text" ? (
                  <Paper
                    className="relative p-5 m-2"
                    sx={{
                      backgroundColor: "#0c0a09",
                      color: "white",
                    }}
                  >
                    <span>{message.message}</span>
                    <small className="absolute bottom-1 right-1 text-xs">
                      {formatTime(message.timestamp)}
                    </small>
                  </Paper>
                ) : (
                  <Paper
                    className="relative p-2 m-2"
                    sx={{
                      backgroundColor: "#0c0a09",
                      color: "white",
                    }}
                  >
                    <img className="w-96" src={message.message} alt="" />
                    <small className="absolute bottom-1 right-1 text-xs">
                      {formatTime(message.timestamp)}
                    </small>
                  </Paper>
                )}
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
