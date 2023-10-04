import { useEffect, useState } from "react";
import L, { LatLngExpression } from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getGeolocs } from "../../../firebase";
import { useGeoStore } from "../../store/store";

interface IGeoData {
  description: string;
  lat: string;
  lng: string;
  name: string;
}

export const Map = () => {
  const { coordinates, setCoordinates } = useGeoStore();
  const [currentPosition, setCurrentPosition] = useState({
    latitude: null,
    longitude: null,
  });
  const [geoData, setgeoData] = useState([]);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getGeolocs().then((res: any) => {
      // console.log(res);
      setgeoData(res);
    });
  }, []);

  const customIcon = new L.Icon({
    iconUrl: "img/g-logo_myv.svg",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const customCurrentIcon = new L.Icon({
    iconUrl: "img/myvlogo-azul.svg",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  if (!navigator.geolocation) {
    console.log("location is not supported");
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoordinates(position.coords.latitude, position.coords.longitude);
      setCurrentPosition([position.coords.latitude, position.coords.longitud]);

      // const latLong = [coords.latitude, coords.longitude];
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
    });
  }, []);

  console.log(coordinates.latitude);
  // const [coordinates, setCoordinate] = useState({
  //   latitude: "",
  //   longitude: "",
  // });

  // console.log(coordinates);
  // console.log(
  //   "test coordenadas zustand: ",
  //   coordinates.latitude,
  //   coordinates.longitude
  // );

  const positionX: LatLngExpression = [-32.18934969088824, -64.47930554177826];

  const popup = L.popup();

  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click(e) {
        console.log("mouse event", e.latlng);
        // map.locate()
        popup
          .setLatLng(e.latlng)
          .setContent(
            ` <div class="flex w-72 justify-between">
              <span>${e.latlng.lat} ${e.latlng.lng} </span>
              <a href="#formPlace">
                <img src="/img/check.png" alt="current place" class="w-4" />
              </a>
            </div> `
          )
          .openOn(map);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      locationfound(e: any) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={positionX} icon={customCurrentIcon}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  return (
    <MapContainer
      center={positionX}
      zoom={13}
      scrollWheelZoom={false}
      className="relative top-10 md:top-20"
      style={{ height: "80vh", width: "100%", zIndex: "0" }}
      id="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />

      <Marker position={positionX} icon={customCurrentIcon} />

      {geoData &&
        geoData.map((mark: IGeoData, index) => (
          <Marker
            key={index}
            position={[parseFloat(mark?.lat), parseFloat(mark?.lng)]}
            icon={customIcon}
          >
            <Popup>{mark.description}</Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};
