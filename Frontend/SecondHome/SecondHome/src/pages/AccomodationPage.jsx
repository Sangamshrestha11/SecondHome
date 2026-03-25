import { useNavigate } from "react-router-dom";

export default function AccommodationPage() {
  const navigate = useNavigate();

  const rooms = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      price: "Rs. 8000/month",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      price: "Rs. 10000/month",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      price: "Rs. 9000/month",
    },
  ];

  return (
    <div className="min-h-screen bg-[rgb(15,23,42)] text-white px-4 py-8">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-8 text-center">
        Accommodation
      </h1>

      {/* Room Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white text-black rounded-xl shadow-lg overflow-hidden hover:scale-105 transition transform"
          >
            <img
              src={room.image}
              alt="room"
              className="w-full h-60 object-cover"
            />

            <div className="p-4 text-center">
              <h2 className="text-xl font-bold mb-2">
                Hostel Room
              </h2>

              <p className="text-gray-700 mb-4">
                {room.price}
              </p>

              <button
                onClick={() => navigate("/room-application")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}

      </div>

      {/* Amenities Section */}
      <div className="mt-16 bg-[rgb(15,23,42)] p-8 rounded-xl shadow-md text-white">

        <h2 className="text-2xl font-bold mb-6">
          Property Amenities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div>
            <h3 className="font-bold mb-2">Internet</h3>
            <p>Available in all rooms: Free WiFi</p>
          </div>

          <div>
            <h3 className="font-bold mb-2">Parking & Transportation</h3>
            <p>Available</p>
          </div>

          <div>
            <h3 className="font-bold mb-2">Canteen</h3>
            <p>Meal: As per routine</p>
          </div>

        </div>

        <h2 className="text-2xl font-bold mt-10 mb-6">
          Room Amenities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <h3 className="font-bold mb-2">Bedroom</h3>
            <p>Bed</p>
            <p>Closet</p>
            <p>Study Table</p>
            <p>Bathroom</p>
          </div>

        </div>

      </div>

    </div>
  );
}