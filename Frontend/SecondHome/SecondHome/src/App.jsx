import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ResetPassword from "./pages/ResetPassword";
import HomePage from "./pages/HomePage";
import "./App.css";
import "leaflet/dist/leaflet.css";
import MapComponent from "./pages/MapComponent";
import RoomForm from "./components/RoomForm";

function App() {
  return (
  <BrowserRouter>
    <Routes>
  <Route path="/" element={<LoginPage />} />
  <Route path="/reset-password" element={<ResetPassword />} />
  <Route path="/home" element={<HomePage />} />
  <Route path="/map" element={<MapComponent/>} />
  {/* <Route path="/" element={<Home />} /> */}
        <Route path="/apply" element={<RoomForm />} />

  </Routes>
  </BrowserRouter>
  );
}

export default App;