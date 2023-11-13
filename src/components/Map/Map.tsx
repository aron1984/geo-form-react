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
import {IDataFirebase} from "../../utils/interfaces.ts";

interface IGeoData {
  description: string;
  lat: string;
  lng: string;
  name: string;
}

export const Map = () => {
  const { myCoordinates, setMyPosition, setCoordinates, coordinates } =
    useGeoStore();
  const [geoData, setgeoData] = useState([]);
  const [storedData, setStoredData] = useState([])
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getGeolocs().then((res: any) => {
      // console.log(res);
      setgeoData(res);
    });
  }, []);

  useEffect(() => {
    const storedObject = sessionStorage.getItem('dataUser');
    if (storedObject) {
      setStoredData(JSON.parse(storedObject));
    }
  }, [sessionStorage]);


  const customIcon = new L.Icon({
    iconUrl: "img/g-logo_myv.svg",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const customIconStorage = new L.Icon({
    iconUrl: "img/myvlogo-verde.svg",
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

  const customClickIcon = new L.Icon({
    iconUrl: "img/my-location.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  if (!navigator.geolocation) {
    console.log("location is not supported");
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setMyPosition(position.coords.latitude, position.coords.longitude);
      // console.log('Mi posicion actual: ',position.coords.latitude, position.coords.longitude) // puede dar una localizacion erronea
    });
  }, []);

  const positionX: LatLngExpression = [-32.18934969088824, -64.47930554177826];

  const popup = L.popup();

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        // map.locate()
        const popupOffset = [0.004, 0];
        popup
          // .setLatLng(e.latlng)
          .setLatLng([
            e.latlng.lat + popupOffset[0],
            e.latlng.lng - popupOffset[1],
          ])
          .setContent(
            ` <div class="flex w-52 justify-between">
                <div class='flex flex-col w-full gap-2'>
                  <div class='flex w-full items-center'>
                    <img alt="coordenada" src="/img/latitud.png" class='w-5 h-5 mr-1'><span class='pt-1'>${e.latlng.lat}</span>
                  </div>
                  <div class='flex w-full items-center'>
                    <img alt="coordenada" src="/img/longitud.png" class='w-5 h-5 mr-1'><span class='pt-1'> ${e.latlng.lng}</span>
                  </div>
                </div>
                <a href="#formPlace" class='flex items-center'>
                  <img src="/img/check.png" alt="current place" class="w-10 h-10 m-auto" />
                </a>
              </div>
           `
          )
          .openOn(map);

        setCoordinates(e.latlng.lat.toString(), e.latlng.lng.toString());
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // locationfound(e: any) {
      //   setPosition(e.latlng);
      //   map.flyTo(e.latlng, map.getZoom()); // funcion que vuela a una posicion
      // },
    });

    return (
      coordinates.latitude !== '' &&
      coordinates.longitude !== '' && (
        <Marker
          position={[parseFloat(coordinates?.latitude), parseFloat(coordinates?.longitude)]}
          icon={customClickIcon}
        >
          <Popup>Hola!</Popup>
        </Marker>
      )
    );
  }

  return (
    <MapContainer
      center={positionX}
      zoom={13}
      scrollWheelZoom={false}
      className="relative top-10 md:top-20 w-full z-0"
      style={{ height: "80vh" }}
      id="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
      {myCoordinates.latitude !== null && myCoordinates.longitude !== null && (
        <Marker
          position={[myCoordinates.latitude, myCoordinates.longitude]}
          icon={customCurrentIcon}
        >
          <Popup>You are here!</Popup>
        </Marker>
      )}

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

      {storedData &&
          storedData.map((mark: IDataFirebase, index) => (
              <Marker
                  key={index}
                  position={[parseFloat(mark?.fLat), parseFloat(mark?.fLng)]}
                  icon={customIconStorage}
              >
                <Popup>{mark.fDes}</Popup>
              </Marker>
          ))}
    </MapContainer>
  );
};
