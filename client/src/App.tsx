import "./styles/App.css";
import { RoutesView } from "./routes/routes";
import { ThemeProviderComponent } from "./context/ThemeContext";
import { UserProvider } from "./context/UserActiveContext";

function App() {
  return (
    <UserProvider>
      <ThemeProviderComponent>
        <RoutesView />
      </ThemeProviderComponent>
    </UserProvider>
  );
}

export default App;
