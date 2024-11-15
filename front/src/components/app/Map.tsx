import React, { useRef, useEffect, useState, MutableRefObject } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Size = {
  width?: number;
  height?: number;
};

function useSize(ref: MutableRefObject<HTMLElement | null>): Size {
  const [size, setSize] = useState<Size>({});

  useEffect(() => {
    if (ref.current == null) return;
    const observer = new ResizeObserver(([entry]) => setSize(entry.contentRect));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}

type ResizerProps = {
  mapRef: MutableRefObject<HTMLElement | null>;
};

const Resizer: React.FC<ResizerProps> = ({ mapRef }) => {
  const map = useMap();
  const { width, height } = useSize(mapRef);

  useEffect(() => {
    console.log(width, height);
    if (map) {
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    }
  }, [map, height, width]);

  return null;
};

const Map: React.FC = () => {
  const position: [number, number] = [0, 0]; // Replace with desired coordinates
  const mapRef = useRef<HTMLDivElement | null>(null);

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
        <Resizer mapRef={mapRef} />
      </MapContainer>
    </div>
  );
};

export default Map;
