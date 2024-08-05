import { useState, useEffect } from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, Button, Fade, Icon, Menu, MenuItem } from "@mui/material";
import DarkMode from "./DarkModeSw";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";
import CONST from "../services/config.d";
import Add from "@mui/icons-material/Add";
import { useThemeContext } from "../context/ThemeContext";
import { Users } from "../types/types";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function ChatsDrawer({
  handleChangeChat,
}: {
  handleChangeChat: (chat: string) => void;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [chats, setChats] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [users, setUsers] = useState<Users[]>();
  const { mode } = useThemeContext();

  const buttonColor = mode === "dark" ? "white" : "black";
  const buttonTextColor = mode === "dark" ? "black" : "white";

  useEffect(() => {
    const getChat = async () => {
      const response = await axios.get(
        `${CONST.API_CONSTANTS.BACKEND_URL}/messages/chats`,
        { withCredentials: true }
      );
      const data = response.data;
      setChats(data);
    };

    getChat();
  }, []);

  const createChatRoom = async (recipient: string) => {
    const response = await axios.post(
      `${CONST.API_CONSTANTS.BACKEND_URL}/messages`,
      { recipient },
      { withCredentials: true }
    );

    const data = response.data;
    console.log(data);
    setChats((prevChats) => [...prevChats, data.name]);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);

    const response = await axios.get(
      `${CONST.API_CONSTANTS.BACKEND_URL}/user/all`
    );
    const data = response.data;
    setUsers(data);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex">
      <Drawer variant="permanent" open={drawerOpen}>
        <DrawerHeader className="flex flex-col justify-center items-center mt-4">
          <List className="w-full flex flex-col items-center justify-center ">
            {drawerOpen ? (
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            ) : (
              <IconButton onClick={handleDrawerOpen}>
                <ChevronRightIcon />
              </IconButton>
            )}
            <article className="ms-5">
              <DarkMode />
            </article>
          </List>
        </DrawerHeader>
        <Divider />
        <List className="w-full flex flex-col items-center justify-center ">
          {chats?.length >= 1 &&
            chats.map((chat) => (
              <article
                onClick={() => handleChangeChat(chat)}
                key={chat}
                className="mb-2 w-full flex items-center justify-center"
              >
                <Avatar sx={{ color: "white" }} className={`${drawerOpen ?("ms-2"):("")}`}>{chat.charAt(0)}</Avatar>
                {drawerOpen && (
                  <span className="ms-2 flex-1 text-left">@{chat}</span>
                )}
              </article>
            ))}
        </List>
        <Divider />
        <List className="w-full flex flex-col items-center justify-center ">
          {!drawerOpen ? (
            <article>
              <Icon onClick={handleClick} sx={{ fontSize: 30 }}>
                add_circle
              </Icon>
            </article>
          ) : (
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{
                background: buttonColor,
                color: buttonTextColor,
                "&:hover": {
                  backgroundColor: "#a8a29e",
                },
              }}
              onClick={handleClick}
            >
              New Chat
            </Button>
          )}
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            TransitionComponent={Fade}
            className="flex flex-col w-96 h-96"
          >
            <h4 className="mb-2 font-semibold">
              Find a new person to chat with
            </h4>
            {users?.map((user, index) => (
              <MenuItem key={user._id}>
                <div
                  className="w-full"
                  onClick={() => createChatRoom(user.name)}
                >
                  <article className="flex items-center mb-1 mt-1 w-full">
                    <Avatar sx={{ color: "white" }}>
                      {user.name && user.name.charAt(0)}
                    </Avatar>
                    <span className="ms-2">{user.name}</span>
                  </article>
                  {index !== users.length - 1 && (
                    <article className="w-full">
                      <Divider />
                    </article>
                  )}
                </div>
              </MenuItem>
            ))}
          </Menu>
        </List>

        <List className="h-full flex flex-col justify-end">
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: drawerOpen ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: drawerOpen ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Settings"}
                sx={{ opacity: drawerOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
