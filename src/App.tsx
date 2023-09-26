import "./App.css";
import "tailwindcss/tailwind.css";
import "leaflet/dist/leaflet.css";
import { getGeolocs } from "./../firebase";
import { Map } from "./components/Map/Map";

function App() {
  getGeolocs().then((res: unknown) => console.log(res));
  // getGeoloc("9frqLUtTnsPEhv3A30dp").then((res: unknown) =>
  //   console.log("promise", res)
  // );
  return (
    <>
      <Map />
      <div className="flex flex-col justify-center items-center gap-5 m-auto mt-auto mb-auto h-96 p-0">
        <h2>Esto va ser un mapa</h2>
        <img src="img/g-logo_myv.svg" className="w-11 h-11" />
      </div>
    </>
  );
}

export default App;
