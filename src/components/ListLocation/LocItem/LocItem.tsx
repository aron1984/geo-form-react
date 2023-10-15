import { FC } from "react";
import { IGeoData } from "../../../utils/interfaces";

interface ILoc {
  item: IGeoData;
}

export const LocItem: FC<ILoc> = ({ item }) => {
  return (
    <div className="flex w-full h-28 bg-slate-100 p-2 md:p-3 my-2 md:m-3">
      <div className="flex flex-col items-start w-4/5">
        <div className="h-8 flex items-end w-full">
          <h5 className="text-sm m-0 font-medium">{item.name}</h5>
        </div>
        <div className="flex flex-row w-full justify-start items-center gap-1">
          <div className="flex w-auto">
            <img
              src="/img/latitud.png"
              className="w-4 h-4 mr-1"
              alt="latitud"
            />
            <span className="text-xs">{item.lat}</span>
          </div>
          <div className="flex w-auto">
            <img
              src="/img/longitud.png"
              className="w-4 h-4 mr-1"
              alt="latitud"
            />
            <span className="text-xs">{item.lng}</span>
          </div>
        </div>
        <div className="flex justify-start text-xs md:text-sm py-2">
          <p>{item.description}</p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center w-1/5 gap-2">
        <img className="w-8 h-8" src="/img/edit.png" alt="modificar" />
        <img className="w-8 h-8" src="/img/delete.png" alt="eliminar" />
      </div>
    </div>
  );
};
