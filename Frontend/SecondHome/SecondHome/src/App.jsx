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
      <<<<<<< dilasha
  <Route path="/accommodation" element={<AccommodationPage />} />
=======
  <Route path="/" element={<Home />} />
        <Route path="/apply" element={<RoomForm />} />

>>>>>>> main

  </Routes>
  </BrowserRouter>
  );
}

export default App;
