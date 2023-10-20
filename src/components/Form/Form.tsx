import React, { useEffect, useState } from "react";
import { useGeoStore } from "../../store/store";
import { saveGeoloc, updateGeoloc } from "../../../firebase";
import Modal from "../Modal/Modal";

export const Form = () => {
  const isEnabled = false;
  const label = "text-gray-200 text-sm md:text-lg";

  const {
    coordinates,
    setLatitude,
    setLongitude,
    setShowLoadingSpiner,
    // formDataStore, // REFACTOR: VER QUEHACEMOS CON ESTE DATO.. era para sacar el useState y usa este 
    // setFormDataStore,
    selectedDocId,
    setSelectedDocId,
  } = useGeoStore();

  const [formData, setFormData] = useState({
    latitude: coordinates.latitude?.toString() || "",
    longitude: coordinates.longitude?.toString() || "",
    name: "",
    image: null as File | null,
    description: "",
  });
  const [errorGeneral, setErrorGeneral] = useState(false);
  const [errors, setErrors] = useState({
    latitude: "",
    longitude: "",
    name: "",
    description: "",
  });

  const [showModalSucces, setShowModalSucces] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [showModalUpdateSucces, setShowModalUpdateSucces] = useState(false);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement | null>) => {
    const selectedImage = e.target.files && e.target.files[0];

    if (selectedImage) {
      setFormData({
        ...formData,
        image: selectedImage, // Asignar un objeto File.
      });
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "latitude") {
      setLatitude(parseFloat(value));
    }

    if (name === "longitude") {
      setLongitude(parseFloat(value));
    }

    if (name === "description") {
      setFormData({
        ...formData,
        description: value,
      });
    }

    if (name === "name") {
      setFormData({
        ...formData,
        name: value,
      });
    }

    // Verificar si el campo está vacío en el evento blur
    if (e.type === "blur" && value.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Este campo no puede estar vacío",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "", // Limpiar el mensaje de error si el campo ya no está vacío
      }));
    }
  };

  const isSubmitDisabled =
    formData.latitude === "" ||
    formData.longitude === "" ||
    formData.name === "" ||
    formData.description === "";

  const isClearEnabled =
    formData.latitude !== "" ||
    formData.longitude !== "" ||
    formData.name !== "" ||
    formData.description !== "";

  const handleClearForm = () => {
    setFormData({
      latitude: "",
      longitude: "",
      name: "",
      image: null,
      description: "",
    });
  };

  const onHandleSubmit = () => {
    setShowLoadingSpiner(true);
    setTimeout(() => {
      handleSubmit();
    }, 2000);
  };

  const handleSubmit = () => {
    // e.preventDefault();

    if (Object.values(errors).some((error) => error !== "")) {
      setErrorGeneral(true);
      return;
    }
    const data = {
      fLat: formData.latitude,
      fLng: formData.longitude,
      fNam: formData.name,
      fDes: formData.description,
    };

    try {
      // setFormDataStore(data);
      if (selectedDocId.length > 0) {
        updateGeoloc(selectedDocId, data);
        setShowModalUpdateSucces(true);
      } else {
        saveGeoloc(data);
        setFormData({
          latitude: "",
          longitude: "",
          name: "",
          image: null,
          description: "",
        });
        setShowModalSucces(true);
      }
      setShowLoadingSpiner(false);
    } catch (error) {
      console.warn(error);
      setShowLoadingSpiner(false);
      setShowModalError(true);
    }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      latitude: coordinates.latitude?.toString() || "",
      longitude: coordinates.longitude?.toString() || "",
    });
  }, [coordinates.latitude]);

  // console.log("formDataStore", formDataStore);
  // console.log("selected doc ID from places", selectedDocId);

  return (
    <>
      <div className="flex w-full flex-col bg-slate-600 justify-center py-20 px-10 gap-2 absolute top-630 md:top-824">
        <h3 className="font-bold text-base md:text-3xl text-gray-100">
          Formulario
        </h3>
        <form
          // onSubmit={(e) => handleSubmit(e)}
          onReset={() => handleClearForm()}
          id="formPlace"
          className="flex flex-col gap-3 justify-start items-start m-auto w-full md:max-w-3xl mt-2 md:mt-4"
        >
          <div className="flex flex-col md:flex-row gap-3 w-full">
            <div className="flex flex-col items-start md:w-1/2">
              <label htmlFor="latitud" className={label}>
                Latitud
              </label>
              <input
                className="w-full h-8 flex items-center px-2"
                type="text"
                id="latitude"
                name="latitude"
                value={
                  coordinates.latitude === 0
                    ? ""
                    : coordinates.latitude?.toString()
                }
                onChange={handleChange}
                onBlur={handleChange} // Manejar el evento blur
              />
              <span className="text-red-500">{errors.latitude}</span>
            </div>
            <div className="flex flex-col items-start md:w-1/2">
              <label htmlFor="longitud" className={label}>
                Longitud
              </label>
              <input
                className="w-full h-8 flex items-center px-2"
                type="text"
                id="longitude"
                name="longitude"
                value={
                  coordinates.longitude === 0
                    ? ""
                    : coordinates.longitude?.toString()
                }
                onChange={handleChange}
                onBlur={handleChange} // Manejar el evento blur
              />
              <span className="text-red-500">{errors.longitude}</span>
            </div>
          </div>
          <div className="flex flex-col items-start w-full">
            <label htmlFor="name" className={label}>
              Título
            </label>
            <input
              className="w-full h-8 flex items-center px-2"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleChange}
            />
            <span className="text-red-500">{errors.name}</span>
          </div>
          {isEnabled && (
            <div className="flex flex-col items-start w-full">
              <label htmlFor="image" className={label}>
                Imgaen
              </label>
              <input
                className="w-full h-8 flex items-center"
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChangeFile}
              />
            </div>
          )}
          <div className="flex flex-col items-start w-full">
            <label htmlFor="description" className={label}>
              Descripción
            </label>
            <textarea
              className="w-full h-20 md:h-40 p-2"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={handleChange}
            ></textarea>
            <span className="text-red-500">{errors.description}</span>
          </div>
          <div className="h-5 text-sm w-full">
            {errorGeneral && (
              <span className="text-red-500 w-full">
                "Hay errores en el formulario. Por favor, revíselos."
              </span>
            )}
          </div>
          <div className="flex w-full gap-2">
            <button
              className={
                isSubmitDisabled
                  ? "flex w-1/2 bg-gray-400 text-white justify-center items-center h-10 mt-4"
                  : "flex w-1/2 bg-cyan-400 text-white justify-center items-center h-10 mt-4"
              }
              type="button"
              disabled={isSubmitDisabled}
              onClick={() => onHandleSubmit()}
            >
              Guardar
            </button>
            <button
              className={
                isClearEnabled
                  ? "flex w-1/2 bg-red-500 text-white justify-center items-center h-10 mt-4"
                  : "flex w-1/2 bg-gray-400 text-white justify-center items-center h-10 mt-4"
              }
              type="reset"
              onClick={handleClearForm}
            >
              Limpiar
            </button>
          </div>
        </form>
      </div>

      {showModalSucces && (
        <Modal
          onPrimaryAction={() => setShowModalSucces(false)}
          data={{
            title: "Perfecto",
            textButton: "Entendido",
            descripton: "Guardaste la localización con éxito",
            icon: undefined,
            type: "success",
          }}
        />
      )}
      {showModalError && (
        <Modal
          onPrimaryAction={() => {
            setShowModalError(false);
            handleClearForm();
          }}
          data={{
            title: "Algo salió mal",
            textButton: "Entendido",
            descripton:
              "No se pudo guardar la localización. Volvé a intentarlo más tarde",
            icon: undefined,
            type: "error",
          }}
        />
      )}
      {showModalUpdateSucces && (
        <Modal
          onPrimaryAction={() => {
            setShowModalUpdateSucces(false);
            setSelectedDocId("");
            handleClearForm();
          }}
          data={{
            title: "Actualizaste",
            textButton: "Entendido",
            descripton: "Actualizaste el localización con éxito.",
            icon: undefined,
            type: "success",
          }}
        />
      )}
    </>
  );
};
