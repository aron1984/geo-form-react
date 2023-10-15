import { useEffect, useState } from "react";
import { Layout } from "../../components/layout";

import { getGeolocs } from "../../../firebase";
import { IGeoData } from "../../utils/interfaces";
import { ListLocation } from "../../components/ListLocation";

export const Places = () => {
  const [locations, setLocations] = useState<unknown[] | IGeoData[] | null>([]);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const data = await getGeolocs();
        setLocations(data);
      } catch (error) {
        console.error("Error al obtener las localizaciones:", error);
      }
    }

    fetchLocations();
  }, []);

  return (
    <Layout title="places" subtitle="Mis lugares">
      <div className="flex absolute top-24 md:top-40 w-full justify-center items-start">
        <ListLocation data={locations}/>
       
      </div>
    </Layout>
  );
};
