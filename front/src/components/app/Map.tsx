import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import Resizer from "./Resizer";
import "leaflet/dist/leaflet.css";

const Map: React.FC = () => {
  const position: [number, number] = [0, 0]; // Replace with desired coordinates
  const mapRef = useRef<HTMLDivElement | null>(null);

  const resize = (width:number, height:number, ref:any) => {
    console.log(ref);
    if (ref)
      ref.invalidateSize();
  };

  return (
    <div ref={mapRef} className="w-full h-full">
      <MapContainer className="w-full h-full min-h-[100px]" center={position} zoom={1} maxZoom={5} minZoom={1}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            A sample popup with some information.
          </Popup>
        </Marker>
        <Resizer extRef={mapRef} func={resize} refGetter={useMap}/>
      </MapContainer>
    </div>
  );
};

export default Map;
