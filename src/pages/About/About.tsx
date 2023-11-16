import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import { Layout } from "../../components/layout";
import { useGeoStore } from "../../store/store";
import dataAbout from "./dataAbout";

export const About = () => {
  const { loadingSpinner } = useGeoStore();
  return (
    <Layout title="about" subtitle="Sobre el proyecto">
      <div className="flex relative top-10 md:top-20  flex-col w-full h-auto pb-16 pt-5 md:w-824 m-auto">
        <h3 className="text-slate-800 text-xl font-bold mt-5 md:mt-10">
          React Geo Form.
        </h3>
        <article className="flex flex-col justify-center text-sm md:text-lg text-justify gap-4 my-10 ">
          <p>
            El objetivo final de este proyecto fue integrar los mundos en los
            que me especilicé, el de Geografía (Lic. en Geografía) y la
            programación.
          </p>
          <p>
            Esta página está creada con React Vite, con TypeScript y en torno a
            Leaflet. En esta versión 1.0, el objetivo fue manejar (agregar,
            editar y borrar) localizaciones a una base de datos de Firebase.
          </p>
          <p>
            Zustand fue la librería que elegí para manejar los estados. Tailwind
            Css para dar estilo a todo, y React-loader-spinner que utilicé para
            explorar.
          </p>
          <h4 className="text-slate-800 text-base font-bold mt-5 md:mt-10">
            Próximos pasos
          </h4>
          <p>Para próximas versiones, las siguientes actualizaciones:</p>
          <ul>
            <li>- Layouts (satelite, dark).</li>
            <li>- Dark / Light mode.</li>
            <li>- Visualizción de localizaciónes por usuario.</li>
            <li>- Guardar imagenes en el registro de la localiación.</li>
            <li>
              - Visualizción de localizaciónes gernerales para todos los
              perfiles.
            </li>
            <li>- Visualizción de localizaciónes por usuario.</li>
          </ul>
        </article>
        <hr style={{ border: "solid 1px gray" }} />
        <section className="mt-10">
          <ul className="flex flex-row flex-wrap gap-3 justify-center">
            {dataAbout.tools.map((tool: { name: string; link: string }) => (
              <li
                key={tool.name}
                className="bg-slate-700 text-white text-sm px-2 py-1 hover:bg-slate-500 focus:outline-none focus:bg-slate-500 cursor-pointer"
              >
                <Link to={tool.link} target="_blank">
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
      {loadingSpinner && <Spinner data={"Loadings"} color="delete" />}
    </Layout>
  );
};
