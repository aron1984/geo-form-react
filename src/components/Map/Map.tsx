import { useEffect, useState } from "react";
import L, { LatLngExpression } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import { escuelas } from "../../utils/constants";
import { getGeolocs } from "../../../firebase";
import { useGeoStore } from "../../store/store";
// import { escuelas } from "../../utils/";

interface IGeoData {
  description: string;
  lat: string;
  lng: string;
  name: string;
}

export const Map = () => {
  const { coordinates, setCoordinates } = useGeoStore();
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

  if (!navigator.geolocation) {
    console.log("location is not supported");
  }

  // const [coordinates, setCoordinate] = useState({
  //   latitude: "",
  //   longitude: "",
  // });

  console.log(coordinates);
  console.log('test coordenadas zustand: ', coordinates.latitude, coordinates.longitude)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      setCoordinates(coords?.latitude.toString(), coords?.longitude.toString());
      // const latLong = [coords.latitude, coords.longitude];
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );

      // const selectLng = document.getElementById('longitude');

      // selectLng.value = coords.longitude;

      // selectLat.innerText = valLat;

      // // Set view of center with current position.
      // const map = L.map('map').setView(latLong, 12);  //center of the map

      // // ADD map with leaflet

      // // set current marker
      // var markerHere = L.icon({
      //     iconUrl: 'assets/img/user.png',
      //     iconSize: [30, 30], /*tamaño de lado por lado*/
      //     iconAnchor: [15, 20], /*posicion horizontal y vertical respectivamente*/
      //     popupAnchor: [-3, -25],

      // });
      // // Current marker add to map
      // var currentMarker = L.marker(latLong, { icon: markerHere }).addTo(map);

      // // Pop up
      // var popup = L.popup();

      // // Into of function popup onMapClick, add manage DOM for add value at a input of lat and long.
      // function onMapClick(e) {
      //     popup
      //         .setLatLng(e.latlng)
      //         .setContent(e.latlng.lat + " " + e.latlng.lng + " " + `<a href="#formPlace"><i class="bi bi-check-square-fill"></i></a>`)
      //         .openOn(map);

      //     console.log(e.latlng.lat);

      //     console.log(e.latlng.lng);

      //     let selectLat = document.getElementById('f-latitude');
      //     selectLat.value = e.latlng.lat;

      //     let selectLng = document.getElementById('f-longitude');
      //     selectLng.value = e.latlng.lng;

      //     // to display buton scroll to form
      //     // document.getElementById('aceptLocate').style.display = 'block';
      //     // document.getElementsByClassName('btn-Control').style.display = 'block';
      // }

      // map.on('click', onMapClick);

      // // The map
      // var CyclOSM = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
      //     maxZoom: 20,
      //     attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      // }).addTo(map);
    });
  }, []);

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
            <Popup>{mark.description}</Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};
