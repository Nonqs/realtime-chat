import { useThemeContext } from "../context/ThemeContext";
import logo from "../public/logo.svg";
import logoB from "../public/logoBlack.svg";
import DarkMode from "./DarkModeSw";

export default function Navbar({
  handleButtonUpdate,
  handleUpdate,
}: {
  handleButtonUpdate: () => void;
  handleUpdate: () => void;
}) {

  const { mode } = useThemeContext();

  return (
    <nav className="flex w-full drop-shadow-2xl">
      <article
        onClick={handleUpdate}
        className="flex w-1/4 justify-start items-center"
      >
        <img className="w-10" src={mode === "dark" ?(logo):(logoB)} alt="logo" />
        <h1 className="font-bold text-xl">NestChat</h1>
      </article>
      <article className="flex w-full justify-between items-center">
        <span onClick={handleButtonUpdate} className="font-semibold ">
          How it works
        </span>
        <DarkMode />
      </article>
    </nav>
  );
}
