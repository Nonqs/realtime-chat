import './styles/App.css';
import { RoutesView } from './routes/routes';
import { ThemeProviderComponent } from './context/ThemeContext';


function App() {
 

  return (
    <ThemeProviderComponent>
      <RoutesView />
    </ThemeProviderComponent>
  )
}

export default App
