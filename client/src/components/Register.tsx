import { Button, TextField, Link, Paper } from "@mui/material";
import { useThemeContext } from "../context/ThemeContext";
import { useState, FormEvent } from "react";
import axios from "axios";
import CONST from "../services/config.d";
import { useNavigate } from "react-router-dom";

interface RegisterResponseData {
  success: boolean;
  message: string;
  // Otros campos de la respuesta si es necesario
}

export function Register() {
  const { mode } = useThemeContext();
  const changeButton = mode === "light" ? "#0c0a09" : "#fafaf9";
  const textButton = mode === "dark" ? "black" : "white";
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post<RegisterResponseData>(
        `${CONST.API_CONSTANTS.BACKEND_URL}/auth/register`,
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
        <h3>Register</h3>
        <form onSubmit={handleSubmit}>
          <article className="flex flex-col gap-5 mt-5 mb-5">
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              required
              onChange={(e) => setUsername(e.target.value)}
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
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "initial",
                },
              }}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
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
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "initial",
                },
              }}
            />
          </article>
          <article className="mb-5">
            <Link href="/auth/login" color="inherit" underline="hover">
              <span className="text-sm">You have an account? Go to Login</span>
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
            Register
          </Button>
        </form>
      </Paper>
    </div>
  );
}
