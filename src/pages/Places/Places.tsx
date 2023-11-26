import { useEffect, useState } from 'react';
import { Layout } from '../../components/layout';
import { useNavigate } from 'react-router';

import { onGetGeoloc, deleteGeoloc } from '../../../firebase';
import {
  DocumentWithId,
  IDataFirebase,
  IGeoData,
} from '../../utils/interfaces';
import { ListLocation } from '../../components/ListLocation';
import { useGeoStore } from '../../store/store';
import Spinner from '../../components/Spinner/Spinner';
import Modal from '../../components/Modal/Modal';

export const Places = () => {
  const {
    setShowLoadingSpiner,
    loadingSpinner,
    setSelectedDocId,
    isLogged,
    user,
  } = useGeoStore();
  const [locations, setLocations] = useState<unknown[] | IGeoData[] | null>([]);
  const [showModalSucces, setShowModalSucces] = useState(false);
  const [showModalError, setShowModalError] = useState(false);

  const navigate = useNavigate();

  const [storedData, setStoredData] = useState([]);

  useEffect(() => {
    const storedObject = sessionStorage.getItem('dataUser');
    if (storedObject) {
      setStoredData(JSON.parse(storedObject));
    }
  }, []);

  useEffect(() => {
    async function fetchLocations() {
      // await getGeolocs(user.uid);
      try {
        onGetGeoloc(user.uid, (querySnapshot: DocumentWithId[]) => {
          const locations: IGeoData[] = [];
          querySnapshot.forEach((doc: DocumentWithId) => {
            const geoloc = doc.data();
            const locationWithId: IGeoData = { ...geoloc, id: doc.id };
            locations.push(locationWithId);
          });

          setLocations(locations);
        });
      } catch (error) {
        console.error('Error al obtener las localizaciones:', error);
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
        console.error('No se pudo eliminar la localización');
        setShowModalError(true);
      } finally {
        setShowLoadingSpiner(false);
      }
    }, 1000);
  };

  const modifyLocation = (id: string) => {
    setSelectedDocId(id);
    setShowLoadingSpiner(true);
    setTimeout(() => {
      try {
        navigate('/');
      } catch (error) {
        console.error('No se pudo editar información de la localización');
        setShowModalError(true);
      } finally {
        setShowLoadingSpiner(false);
      }
    }, 1000);
  };

  const removeFromDataUser = (indexToRemove: number) => {
    const dataUserString: string | null = sessionStorage.getItem('dataUser');

    if (dataUserString !== null) {
      const dataUser: {
        fLat: string;
        fLng: string;
        fNam: string;
        fDes: string;
      }[] = JSON.parse(dataUserString);

      if (indexToRemove >= 0 && indexToRemove < dataUser.length) {
        dataUser.splice(indexToRemove, 1);
        sessionStorage.setItem('dataUser', JSON.stringify(dataUser));
        const storedObject = sessionStorage.getItem('dataUser');
        if (storedObject) {
          setStoredData(JSON.parse(storedObject));
        }
      }
    }
  };

  return (
    <Layout title="places" subtitle="Mis lugares">
      <div className="flex flex-col absolute top-24 md:top-40 w-full justify-center items-center pb-16">
        <ListLocation
          data={locations}
          isLogged={isLogged}
          deleteLocation={deleteLocation}
          modifyLocation={modifyLocation}
          user={user}
        />
        {storedData.length > 0 && (
          <hr className="flex w-full border-gray-700 md:w-824 m-auto my-2" />
        )}

        {/*TODO: crear componentes para esta parte*/}
        <div className="flex flex-row w-full justify-center">
          <ul className="flex flex-col w-full py-2 md:w-824 m-auto items-center justify-center">
            {storedData &&
              storedData.length !== 0 &&
              storedData?.map((data: IDataFirebase, index) => (
                <div className="flex w-full h-28 bg-gray-300 py-2 my-2 md:my-3 shadow-md" key={index}>
                  <div className="flex flex-col items-start w-5/6 px-2 md:px-4">
                    <div className="h-8 flex items-end w-full mb-2">
                      <h5 className="text-sm m-0 font-medium">{data.fNam}</h5>
                    </div>
                    <div className="flex flex-row w-full justify-start items-center gap-1">
                      <div className="flex w-auto">
                        <img
                          src="/img/latitud.png"
                          className="w-4 h-4 mr-1"
                          alt="latitud"
                        />
                        <span className="text-xs">{data.fLat}</span>
                      </div>
                      <div className="flex w-auto">
                        <img
                          src="/img/longitud.png"
                          className="w-4 h-4 mr-1"
                          alt="latitud"
                        />
                        <span className="text-xs">{data.fLng}</span>
                      </div>
                    </div>
                    <div className="flex justify-start text-xs md:text-sm py-2">
                      <p>{data.fDes}</p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center items-center justify-center w-1/6 gap-2 border-l-2 border-l-gray-600">
                    {/*<img*/}
                    {/*    className="w-8 h-8 cursor-pointer"*/}
                    {/*    src="/img/edit.png"*/}
                    {/*    alt="modificar"*/}
                    {/*    onClick={() => console.log(index || "")}*/}
                    {/*/>*/}
                    <img
                      className="w-8 h-8 cursor-pointer"
                      src="/img/delete.png"
                      alt="eliminar"
                      onClick={() => removeFromDataUser(index)}
                    />
                  </div>
                </div>
              ))}
          </ul>
        </div>
      </div>
      {loadingSpinner && <Spinner data={'Loadings'} color="delete" />}
      {showModalSucces && (
        <Modal
          onPrimaryAction={() => setShowModalSucces(false)}
          data={{
            title: 'Perfecto',
            textButton: 'Entendido',
            descripton: 'Borraste la localización con éxito',
            icon: undefined,
            type: 'success',
          }}
        />
      )}
      {showModalError && (
        <Modal
          onPrimaryAction={() => {
            setShowModalError(false);
          }}
          data={{
            title: 'Algo salió mal',
            textButton: 'Entendido',
            descripton:
              'No se pudo borrar la localización. Volvé a intentarlo más tarde',
            icon: undefined,
            type: 'error',
          }}
        />
      )}
    </Layout>
  );
};
