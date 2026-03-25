import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ResetPassword from "./pages/ResetPassword";
import HomePage from "./pages/HomePage";
import AccommodationPage from "./pages/AccomodationPage";
import "./App.css";

function App() {
  return (
  <BrowserRouter>
    <Routes>
  <Route path="/" element={<LoginPage />} />
  <Route path="/reset-password" element={<ResetPassword />} />
  <Route path="/home" element={<HomePage />} />
  <Route path="/accommodation" element={<AccommodationPage />} />
  </Routes>
  </BrowserRouter>
  );
}

export default App;