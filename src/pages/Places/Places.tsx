import { useEffect, useState } from "react";
import { Layout } from "../../components/layout";

import { onGetGeoloc, deleteGeoloc } from "../../../firebase";
import { IGeoData } from "../../utils/interfaces";
import { ListLocation } from "../../components/ListLocation";

export const Places = () => {
  const [locations, setLocations] = useState<unknown[] | IGeoData[] | null>([]);

  useEffect(() => {
    async function fetchLocations() {
      try {
        // const data = await getGeolocs();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onGetGeoloc((querySnapshot: { data: () => any }[]) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const locations: any[] | ((prevState: unknown[] | IGeoData[] | null) => unknown[] | IGeoData[] | null) | null = [];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          querySnapshot.forEach((doc: { data: () => any }) => {
            const geoloc = doc.data();
            const locationWithId = { ...geoloc, id: doc.id };
            locations.push(locationWithId);
          });
          setLocations(locations);
        });
      } catch (error) {
        console.error("Error al obtener las localizaciones:", error);
      }
    }

    fetchLocations();
  }, []);

  return (
    <Layout title="places" subtitle="Mis lugares">
      <div className="flex absolute top-24 md:top-40 w-full justify-center items-start">
        <ListLocation
          data={locations}
          deleteLocation={deleteGeoloc}
          modifyLocation={() => console.log()}
        />
      </div>
    </Layout>
  );
};
