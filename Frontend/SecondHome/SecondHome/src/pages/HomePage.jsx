import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const features = [
    { name: "Profile", icon: "👤" },
    { name: "Payment", icon: "💳" },
    { name: "Notification", icon: "🔔" },
    { name: "Room Application", icon: "🏠" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100 font-sans">

      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="text-5xl font-extrabold text-blue-600 animate-bounce">🏡</div>
          <span className="text-3xl font-bold text-gray-800 tracking-wide">
            Second Home
          </span>
        </div>

        {/* Feature Icons */}
        <div className="flex gap-8 items-center">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="flex flex-col items-center text-gray-700 hover:text-blue-600 cursor-pointer transition"
            >
              <div className="text-3xl">{feature.icon}</div>
              <span className="text-sm mt-1">{feature.name}</span>
            </div>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="ml-4 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Center Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl md:text-7xl font-extrabold text-gray-800 tracking-wide animate-pulse">
          Second Home
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-600 italic">
          Your comfort, our priority
        </p>
      </div>

      {/* Bottom-left Location Feature */}
      <div className="absolute bottom-24 left-6 w-64 h-32 bg-white shadow-lg rounded-xl p-4 flex flex-col justify-center hover:shadow-2xl transition">
        <h2 className="font-semibold text-lg mb-2 text-blue-600 flex items-center gap-2">
          📍 Location
        </h2>
        <p className="text-gray-600 text-sm">
          View hostel location using Google Maps
        </p>
      </div>

      {/* Bottom-right Chat Feature */}
      <div className="absolute bottom-24 right-6 w-16 h-16 bg-blue-600 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-blue-700 transition">
        <span className="text-white text-2xl">💬</span>
      </div>

      {/* Footer - fixed at bottom */}
      <footer className="bg-white shadow-inner text-center py-4 text-gray-500 mt-auto">
        &copy; 2026 Second Home. All rights reserved.
      </footer>
    </div>
  );
}