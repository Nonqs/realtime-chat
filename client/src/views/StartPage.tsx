import { Button, Divider } from "@mui/material";
import CONST from "../services/config.d";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserActiveContext";
import Navbar from "../components/Navbar";
import github from "../public/github.svg";
import githubW from "../public/githubW.svg";
import chat from "../public/chat.png";
import { useState } from "react";
import HowItWorks from "../components/HowItWorks";
import { useThemeContext } from "../context/ThemeContext";

export default function StartPage() {
  const navigate = useNavigate();
  const { updateUser } = useUserContext();
  const [howItWorks, setHowItWorks] = useState<boolean>(true);
  const { mode } = useThemeContext();

  const handleLogin = async (name: string) => {
    try {
      const response = await axios.post(
        `${CONST.API_CONSTANTS.BACKEND_URL}/auth/login`,
        {
          name,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error subiendo el mensaje", error);
    }
    updateUser();
    navigate("/chat");
  };

  const handleButtonUpdate = () => {
    setHowItWorks(!howItWorks);
  };

  const handleUpdate = () => {
    setHowItWorks(true);
  };

  return (
    <section className="w-full h-[100vh] flex flex-col items-center">
      <Navbar
        handleButtonUpdate={handleButtonUpdate}
        handleUpdate={handleUpdate}
      />
      <div className="h-full w-full flex">
        {howItWorks ? (
          <div className="w-1/2 m-20">
            <div className="h-1/2 w-full flex flex-col justify-center items-center">
              <h2 className="text-center uppercase font-extrabold text-6xl ">
                Welcome to <br />
                Nest Chat!
              </h2>
            </div>
            <div className="flex w-full">
              <div className="w-1/2 h-1/2 flex flex-col text-center items-center">
                <article className="mb-5">
                  <h3 className="text-xl font-semibold">Default users </h3>
                </article>
                <Button
                  component="label"
                  variant="contained"
                  className="w-3/4"
                  tabIndex={-1}
                  sx={{
                    backgroundColor: "#fafaf9",
                    "&:hover": {
                      backgroundColor: "#a8a29e",
                    },
                    color: "black",
                    marginBottom: "2em",
                  }}
                  onClick={() => {
                    handleLogin(CONST.USER_LOGIN.NAME);
                  }}
                >
                  Usuario 1
                </Button>
                <Button
                  component="label"
                  variant="contained"
                  tabIndex={-1}
                  className="w-3/4"
                  sx={{
                    backgroundColor: "#0c0a09",
                    "&:hover": {
                      backgroundColor: "#a8a29e",
                    },
                    color: "white",
                  }}
                  onClick={() => {
                    handleLogin(CONST.USER_LOGIN.NAME2);
                  }}
                >
                  Usuario 2
                </Button>
              </div>
              <Divider orientation="vertical" flexItem>Or</Divider>
              <div className="w-1/2 flex flex-col text-center items-center">
                <article>
                  <h3 className="text-xl font-semibold mb-5">Auth</h3>
                </article>
                <Button
                  component="label"
                  variant="contained"
                  className="w-3/4"
                  tabIndex={-1}
                  sx={{
                    backgroundColor: "#fafaf9",
                    "&:hover": {
                      backgroundColor: "#a8a29e",
                    },
                    color: "black",
                    marginBottom: "2em",
                  }}
                  onClick={() => {
                    handleLogin(CONST.USER_LOGIN.NAME);
                  }}
                >
                  Login
                </Button>
                <Button
                  component="label"
                  variant="contained"
                  tabIndex={-1}
                  className="w-3/4"
                  sx={{
                    backgroundColor: "#0c0a09",
                    "&:hover": {
                      backgroundColor: "#a8a29e",
                    },
                    color: "white",
                  }}
                  onClick={() => {
                    handleLogin(CONST.USER_LOGIN.NAME2);
                  }}
                >
                  Register
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-1/2 m-20 flex justify-center items-center">
            <HowItWorks />
          </div>
        )}
        <div className="w-1/2 flex justify-center">
          <img src={chat} alt="chat" className="h-[90vh]" />
        </div>
      </div>
      <article className="flex items-center relative">
        <a
          href="https://github.com/Nonqs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="absolute bottom-0 w-full flex justify-center items-center">
            <article className="flex items-center justify-center rounded-lg w-40 p-2">
              <img src={mode === "dark" ?(githubW):(github)} alt="Icono blanco y negro" className="w-8" />
              <span>@Nonqs</span>
            </article>
          </div>
        </a>
      </article>
    </section>
  );
}
