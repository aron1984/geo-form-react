import {useEffect, useRef, useState} from 'react';
import L, {LatLngExpression} from 'leaflet';
import {
  LayerGroup,
  LayersControl,
  LayersControlProps,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {getGeolocs} from '../../../firebase';
import {useGeoStore} from '../../store/store';
import {IDataFirebase} from '../../utils/interfaces.ts';
import Control from 'react-leaflet-custom-control';
import * as htmlToImage from 'html-to-image';

interface IGeoData {
  description: string;
  lat: string;
  lng: string;
  name: string;
}

interface LayersControlWithClassNameProps extends LayersControlProps {
  className?: string;
}

export const Map = () => {
  const {myCoordinates, setMyPosition, setCoordinates, coordinates, user} =
    useGeoStore();
  const [geoData, setgeoData] = useState([]);
  const [storedData, setStoredData] = useState([]);

  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadPng = async () => {
    const element = printRef.current;

    if (!element) {
      console.error('El elemento no está definido.');
      return;
    }

    try {
      const dataUrl = await htmlToImage.toPng(element);

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'print.png';

      link.click();
    } catch (error) {
      console.error('Error al capturar la imagen:', error);
    }
  };

  const {BaseLayer} = LayersControl;

  const layersControlProps: LayersControlWithClassNameProps = {
    position: 'topright',
    className: 'bg-red',
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getGeolocs(user.uid).then((res: any) => {
      // console.log(res);
      setgeoData(res);
    });
  }, [user.uid]);

  useEffect(() => {
    const storedObject = sessionStorage.getItem('dataUser');
    if (storedObject) {
      setStoredData(JSON.parse(storedObject));
    }
  }, []);

  const customIcon = new L.Icon({
    iconUrl: 'img/g-logo_myv.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const customIconStorage = new L.Icon({
    iconUrl: 'img/myvlogo-verde.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const customCurrentIcon = new L.Icon({
    iconUrl: 'img/myvlogo-azul.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const customClickIcon = new L.Icon({
    iconUrl: 'img/my-location.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  if (!navigator.geolocation) {
    console.log('location is not supported');
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setMyPosition(position.coords.latitude, position.coords.longitude);
      // console.log('Mi posicion actual: ',position.coords.latitude, position.coords.longitude) // puede dar una localizacion erronea
    });
  }, [setMyPosition]);

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
           `,
          )
          .openOn(map);

        setCoordinates(e.latlng.lat.toString(), e.latlng.lng.toString());
      },

      // locationfound(e: any) {
      //   setPosition(e.latlng);
      //   map.flyTo(e.latlng, map.getZoom()); // funcion que vuela a una posicion
      // },
    });

    return (
      coordinates.latitude !== '' &&
      coordinates.longitude !== '' && (
        <Marker
          position={[
            parseFloat(coordinates?.latitude),
            parseFloat(coordinates?.longitude),
          ]}
          icon={customClickIcon}
        >
          <Popup>Hola!</Popup>
        </Marker>
      )
    );
  }

  return (
    <div ref={printRef}>
      <MapContainer
        center={positionX}
        zoom={13}
        scrollWheelZoom={false}
        className="relative top-10 md:top-20 w-full z-0"
        style={{height: '80vh'}}
        id="map"
        // ref={printRef}
      >
        <Control position="topleft">
          <button
            style={{width: '34px', height: '34px', borderRadius: '4px'}}
            onClick={handleDownloadPng}
            className="flex items-center justify-center bg-slate-50 border-neutral-400 border-2 cursor-pointer"
          >
            <img src="/img/descarga.png" width={20} height={20} alt='download'/>
          </button>
        </Control>
        <LayersControl position="topright" {...layersControlProps}>
          <BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>

          <BaseLayer name="Dark">
            <TileLayer
              attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            />
          </BaseLayer>

          {/* Capas adicionales (overlays) si las necesitas */}
          <BaseLayer name="Satélite">
            <TileLayer
              attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </BaseLayer>

          <LayersControl.Overlay checked name="Puntos DB">
            <LayerGroup>
              <div className="overlay-content">
                {/* Renderizar puntos en el mapa */}
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
              </div>
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="Puntos User">
            <LayerGroup>
              <div className="overlay-content">
                {storedData &&
                  storedData.map((mark: IDataFirebase, index) => (
                    <Marker
                      key={index}
                      position={[
                        parseFloat(mark?.fLat),
                        parseFloat(mark?.fLng),
                      ]}
                      icon={customIconStorage}
                    >
                      <Popup>{mark.fDes}</Popup>
                    </Marker>
                  ))}
              </div>
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>

        <LocationMarker/>
        {myCoordinates.latitude !== null &&
          myCoordinates.longitude !== null && (
          <Marker
            position={[myCoordinates.latitude, myCoordinates.longitude]}
            icon={customCurrentIcon}
          >
            <Popup>
              <span>Estas son tus coordenadas</span>
              <br></br>
              <span className="mt-0">
                  Lat: {myCoordinates.latitude} Lng: {myCoordinates.longitude}
              </span>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};
