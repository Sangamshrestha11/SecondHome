import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapComponent() {
  const position = [26.6554085, 87.3019478];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      {/* Card Container */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-[rgb(15,23,42)] text-white px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">📍 Location Map</h1>
          <span className="text-sm text-gray-300">Second Home</span>
        </div>

        {/* Map Section */}
        <div className="p-4">
          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-inner">

            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={true}
              className="h-[500px] w-full"
            >
              <TileLayer
                attribution='© OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={position} icon={customIcon}>
                <Popup>
                  <div className="text-sm">
                    <p className="font-semibold">📍 Your Location</p>
                    <p>Lat: 26.6554085</p>
                    <p>Lng: 87.3019478</p>
                  </div>
                </Popup>
              </Marker>

            </MapContainer>

          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 text-sm text-gray-600 flex justify-between">
          <span>Interactive Map View</span>
          <span>Zoom & explore 🔍</span>
        </div>

      </div>

    </div>
  );
}