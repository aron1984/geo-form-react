import { useState } from "react";

export const Form = () => {
  const label = "text-gray-200 text-sm md:text-lg";
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    name: "",
    image: null,
    description: "",
  });

  const handleChange = (e: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    target: { name: string; value: any; files: any };
  }) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Aquí puedes hacer lo que necesites con los datos del formulario, como enviarlos a un servidor.

    console.log(formData);
  };
  return (
    <div className="flex w-full flex-col bg-slate-600 justify-center py-20 px-10 gap-2 absolute top-630 md:top-824">
      <h3 className="font-bold text-sm md:text-xl text-gray-100">Formulario</h3>
      <form
        onSubmit={handleSubmit}
        id="inputs"
        className="flex flex-col gap-3 justify-start items-start m-auto w-full mt-2 md:mt-4"
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
              value={formData.latitude}
              onChange={handleChange}
            />
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
              value={formData.longitude}
              onChange={handleChange}
            />
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
          />
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
            onChange={handleChange}
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
          ></textarea>
        </div>
        <button
          className="flex w-full bg-cyan-400 text-white justify-center items-center h-10 mt-4"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};
