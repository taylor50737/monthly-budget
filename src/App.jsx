import "./App.css";
import { Routes, Route } from 'react-router-dom'
import WelcomePage from './pages/WelcomePage'
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />}></Route>
      <Route path="/home" element={<HomePage />}></Route>
    </Routes>
  )
}

export default App;
