import { Button, Link, Paper, TextField } from "@mui/material";
import { useThemeContext } from "../context/ThemeContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import CONST from "../services/config.d";

export function Login() {
  const { mode } = useThemeContext();
  const changeButton = mode === "light" ? "#0c0a09" : "#fafaf9";
  const textButton = mode === "dark" ? "black" : "white";
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${CONST.API_CONSTANTS.BACKEND_URL}/auth/login`,
        {
          name: username,
          password,
        },
        { withCredentials: true }
      );

      const data = response.data;

      navigate("/chat");
    } catch (error) {}
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Paper className="p-8 text-center font-semibold text-2xl">
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <article className="flex flex-col gap-5 mt-5 mb-5">
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "initial", // Color del borde inicial
                  },
                  "&:hover fieldset": {
                    borderColor: "initial",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "initial",
                  },
                },
                "& .MuiInputLabel": {
                  color: "initial",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "initial",
                },
              }}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              required
              type="password"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "initial",
                  },
                  "&:hover fieldset": {
                    borderColor: "initial",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "initial",
                  },
                },
                "& .MuiInputLabel": {
                  color: "initial",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "initial",
                },
              }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </article>
          <article className="mb-5">
            <Link href="/auth/register" color={"inherit"} underline="hover">
              <span className="text-sm">
                Don't have an account? Go to register
              </span>
            </Link>
          </article>
          <Button
            type="submit"
            variant="contained"
            className="w-full"
            sx={{
              backgroundColor: changeButton,
              "&:hover": {
                backgroundColor: "#a8a29e",
              },
              color: textButton,
            }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
}
