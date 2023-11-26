import { FC } from 'react';
import { IGeoData, IUser } from '../../../utils/interfaces';

interface ILoc {
  item: IGeoData;
  onModify: (id: string) => void;

  onDelete: () => void;
  isLogged: boolean;
  user: IUser;
}

export const LocItem: FC<ILoc> = ({
  item,
  onDelete,
  onModify,
  isLogged,
  user,
}) => {
  return (
    <div className="flex w-full h-28 bg-slate-100 py-2 my-2 md:my-3 shadow-md">
      <div className="flex flex-col items-start w-5/6 px-2 md:px-4">
        <div className="h-8 flex items-end w-full mb-2">
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
      {isLogged && user.profile === 'admin' && (
        <div className="flex flex-col md:flex-row md:items-center items-center justify-center w-1/6 gap-2 border-l-2">
          <img
            className="w-8 h-8 cursor-pointer"
            src="/img/edit.png"
            alt="modificar"
            onClick={() => onModify(item.id || '')}
          />
          <img
            className="w-8 h-8 cursor-pointer"
            src="/img/delete.png"
            alt="eliminar"
            onClick={onDelete}
          />
        </div>
      )}
    </div>
  );
};
