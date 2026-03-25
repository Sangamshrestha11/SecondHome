import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const RoomMap = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    setLocation({ lat: 27.7172, lng: 85.3240 }); // Example: Kathmandu
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_API_KEY",// Replace with your actual API key
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location}
      zoom={12}
    >
      {location && <Marker position={location} />}
    </GoogleMap>
  );
};

export default RoomMap;