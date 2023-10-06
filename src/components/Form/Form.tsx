import { useEffect, useState } from "react";
import { useGeoStore } from "../../store/store";

export const Form = () => {
  const label = "text-gray-200 text-sm md:text-lg";

  const { coordinates, setLatitude, setLongitude } = useGeoStore();
  const [formData, setFormData] = useState({
    latitude: coordinates.latitude?.toString(),
    longitude: coordinates.longitude?.toString(),
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

  useEffect(() => {
    setFormData({
      ...formData,
      latitude: coordinates.latitude?.toString(),
      longitude: coordinates.longitude?.toString(),
    });
  }, [coordinates]);

  console.log(coordinates);
  console.log("formData: ", formData);

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
    console.log(e.target.name);
    const { name, value } = e.target;

    if (name === "latitude") {
      setLatitude(parseFloat(value));
    }

    if (name === "longitude") {
      setLongitude(parseFloat(value));
    }

    // setFormData((prevData) => ({
    //   ...prevData,
    //   [name]: name === "image" ? files[0] : value,
    // }));

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

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Verificar si hay errores antes de enviar el formulario
    if (Object.values(errors).some((error) => error !== "")) {
      setErrorGeneral(true);
      return;
    }
    // Aquí puedes hacer lo que necesites con los datos del formulario, como enviarlos a un servidor.

    console.log(formData);
  };
  return (
    <div className="flex w-full flex-col bg-slate-600 justify-center py-20 px-10 gap-2 absolute top-630 md:top-824">
      <h3 className="font-bold text-base md:text-xl text-gray-100">
        Formulario
      </h3>
      <form
        onSubmit={handleSubmit}
        onReset={() => handleClearForm}
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
              value={coordinates.latitude?.toString()}
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
              value={coordinates.longitude?.toString()}
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
        <div className="flex flex-col items-start w-full">
          <label htmlFor="description" className={label}>
            Descripción
          </label>
          <textarea
            className="w-full h-20 md:h-40"
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
            type="submit"
            disabled={isSubmitDisabled}
          >
            Guardar
          </button>
          <button
            className={
              isClearEnabled
                ? "flex w-1/2 bg-red-500 text-white justify-center items-center h-10 mt-4"
                : "flex w-1/2 bg-gray-400 text-white justify-center items-center h-10 mt-4"
            }
            // type="reset"
            onClick={handleClearForm}
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};
