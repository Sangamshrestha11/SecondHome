import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ResetPassword from "./pages/ResetPassword";
import HomePage from "./pages/HomePage";
import "./App.css";

function App() {
  return (
  <BrowserRouter>
    <Routes>
  <Route path="/" element={<LoginPage />} />
  <Route path="/reset-password" element={<ResetPassword />} />
  <Route path="/home" element={<HomePage />} />
  </Routes>
  </BrowserRouter>
  );
}

export default App;