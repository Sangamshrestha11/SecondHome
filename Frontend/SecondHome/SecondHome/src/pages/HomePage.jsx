import { useNavigate } from "react-router-dom";
import HomeImage from "../assets/HomeImage.jpg";

export default function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const sidebarItems = [
    { name: "Room Application", icon: "🏠" },
    { name: "Maintenance Request", icon: "🛠️" },
    { name: "Payment", icon: "💳" },
    { name: "Location", icon: "📍" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">

      {/* ---------------- TOP BAR ---------------- */}
      <div className="flex justify-between items-center px-6 py-4 bg-[rgb(15,23,42)] shadow-md">

        {/* Logo Left */}
        <div className="flex items-center gap-2">
          <span className="text-3xl">🏡</span>
          <h1 className="text-2xl font-bold text-blue-600">Second Home</h1>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-8 text-white">

          {/* Profile */}
          <div className="flex flex-col items-center cursor-pointer hover:text-blue-400">
            <span className="text-2xl">👤</span>
            <span className="text-sm">Profile</span>
          </div>

          {/* Notification */}
          <div className="flex flex-col items-center cursor-pointer hover:text-blue-400">
            <span className="text-2xl">🔔</span>
            <span className="text-sm">Notification</span>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ---------------- MAIN SECTION ---------------- */}
      <div className="flex flex-1">

        {/* -------- SIDEBAR -------- */}
        <div className="w-60 bg-[rgb(15,23,42)] shadow-md p-6 flex flex-col gap-6 pt-16">

          {sidebarItems.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3 bg-white text-black px-4 py-3 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition transform hover:scale-105"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </div>
          ))}

        </div>


        {/* -------- MAIN IMAGE AREA -------- */}
        <div className="flex-1 relative min-h-screen">

          {/* Background Image */}
          <img
            src={HomeImage}
            alt="hostel"
            className="w-full h-full object-cover"
          /> 

          {/* Overlay */}
          <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-center items-center text-white text-center">

            <h1 className="text-6xl font-bold mb-4">
              Welcome to Second Home
            </h1>

            <p className="text-2xl italic">
              A place where comfort meets community
            </p>

          </div>
        </div>

      </div>

      {/* -------- CHAT BUTTON -------- */}
      <div className="fixed bottom-24 left-8 bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-blue-700">
        <span className="text-white text-2xl">💬</span>
      </div>


      {/* -------- FOOTER -------- */}
      <footer className="bg-[rgb(15,23,42)] text-white text-center py-6 shadow-inner">

        <p className="font-semibold">
          About Us
        </p>

        <p className="text-sm mt-2">
          Second Home is a student accommodation system designed to
          simplify room booking, payments, and communication.
        </p>

        <p className="mt-2">
          Contact: +977 9800000000
        </p>

        <p className="text-sm mt-2">
          © 2026 Second Home
        </p>

      </footer>

    </div>
  );
}