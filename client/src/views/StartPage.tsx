import { Button } from "@mui/material";
import CONST from "../services/config.d";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserActiveContext";
import Navbar from "../components/Navbar";
import github from "../public/github.svg";
import chat from "../public/chat.png";
import { useState } from "react";
import HowItWorks from "../components/HowItWorks";

export default function StartPage() {
 
  const navigate = useNavigate();
  const { updateUser } = useUserContext();
  const [howItWorks, setHowItWorks] = useState<boolean>(true);

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
    <section className="w-full h-[100vh] flex flex-col items-center bg-gradient-to-r from-[#ddd6fe]  to-white to-90%">
      <Navbar handleButtonUpdate={handleButtonUpdate} handleUpdate={handleUpdate} />
      <div className="h-full w-full flex">
        {howItWorks ? (
          <div className="w-1/2 m-20">
            <div className="h-1/2 w-full flex flex-col justify-center items-center">
              <h2 className="text-center uppercase font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-[#2563eb] to-pink-600">
                Welcome to <br />
                Nest Chat!
              </h2>
            </div>
            <div className="h-1/2 flex flex-col">
              <Button
                component="label"
                variant="contained"
                tabIndex={-1}
                sx={{
                  backgroundColor: "#2563eb",
                  "&:hover": {
                    backgroundColor: "#60a5fa",
                  },
                  color: "white",
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
                sx={{
                  backgroundColor: "#db2777",
                  "&:hover": {
                    backgroundColor: "#fb7185",
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
              <img src={github} alt="Icono blanco y negro" className="w-8" />
              <span className="text-black">@Nonqs</span>
            </article>
          </div>
        </a>
      </article>
    </section>
  );
}
