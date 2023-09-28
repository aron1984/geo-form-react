import { useEffect, useState } from "react";
import L, { LatLngExpression } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import { escuelas } from "../../utils/constants";
import { getGeolocs } from "../../../firebase";
// import { escuelas } from "../../utils/";

interface IGeoData {
  description: string;
  lat: string;
  lng: string;
  name: string;
}

export const Map = () => {
  const [geoData, setgeoData] = useState([]);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getGeolocs().then((res: any) => {
      console.log(res);
      setgeoData(res);
    });
  }, []);

  const customIcon = new L.Icon({
    iconUrl: "img/g-logo_myv.svg",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  const position: LatLngExpression | undefined = [
    -32.18934969088824, -64.47930554177826,
  ];

  // const point: LatLngExpression | undefined = [
  //   -32.18934969088824, -64.47930554177826,
  // ];

  // const point = L.point(-33.18934969088824, -65.47930554177826);
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      className="relative top-10 md:top-20"
      style={{ height: "80vh", width: "100%", zIndex: "0" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geoData &&
        geoData.map((mark: IGeoData, index) => (
          <Marker
            key={index}
            position={[parseFloat(mark?.lat), parseFloat(mark?.lng)]}
            icon={customIcon}
          >
            <Popup>
              {mark.description}
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};
