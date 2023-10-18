import { useEffect, useState } from "react";
import { Layout } from "../../components/layout";

import { onGetGeoloc, deleteGeoloc, getGeolocs } from "../../../firebase";
import { DocumentWithId, IGeoData } from "../../utils/interfaces";
import { ListLocation } from "../../components/ListLocation";
import { useGeoStore } from "../../store/store";
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/Modal/Modal";



export const Places = () => {
  const [locations, setLocations] = useState<unknown[] | IGeoData[] | null>([]);
  const { setShowLoadingSpiner, loadingSpinner } = useGeoStore();
  const [showModalSucces, setShowModalSucces] = useState(false);
  const [showModalError, setShowModalError] = useState(false);

  useEffect(() => {
    async function fetchLocations() {
      await getGeolocs();
      try {
        onGetGeoloc((querySnapshot: DocumentWithId[]) => {
          const locations: IGeoData[] = [];
          querySnapshot.forEach((doc: DocumentWithId) => {
            const geoloc = doc.data();
            const locationWithId: IGeoData = { ...geoloc, id: doc.id };
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

  const deleteLocation = (id: string) => {
    setShowLoadingSpiner(true);
    setTimeout(() => {
      try {
        deleteGeoloc(id);
        setShowModalSucces(true);
      } catch (error) {
        console.error("No se pudo eliminar la localización");
        setShowModalError(true);
      } finally {
        setShowLoadingSpiner(false);
      }
    }, 1000);
  };

  return (
    <Layout title="places" subtitle="Mis lugares">
      <div className="flex absolute top-24 md:top-40 w-full justify-center items-start">
        <ListLocation
          data={locations}
          deleteLocation={deleteLocation}
          modifyLocation={() => console.log()}
        />
      </div>
      {loadingSpinner && <Spinner data={"Loadings"} color="delete" />}
      {showModalSucces && (
        <Modal
          onPrimaryAction={() => setShowModalSucces(false)}
          data={{
            title: "Perfecto",
            textButton: "Entendido",
            descripton: "Borraste la localización con éxito",
            icon: undefined,
            type: "success",
          }}
        />
      )}
      {showModalError && (
        <Modal
          onPrimaryAction={() => {
            setShowModalError(false);
          }}
          data={{
            title: "Algo salió mal",
            textButton: "Entendido",
            descripton:
              "No se pudo borrar la localización. Volvé a intentarlo más tarde",
            icon: undefined,
            type: "error",
          }}
        />
      )}
    </Layout>
  );
};
