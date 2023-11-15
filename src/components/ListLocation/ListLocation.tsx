import { FC } from "react";
import { IGeoData, IUser } from "../../utils/interfaces";
import { LocItem } from "./LocItem";

interface IData {
  data: IGeoData[] | unknown[] | null;
  deleteLocation: (id: string) => void;
  modifyLocation: (id: string) => void;
  isLogged: boolean;
  user: IUser
}

export const ListLocation: FC<IData> = ({
  data,
  deleteLocation,
  modifyLocation,
  isLogged,
  user
}) => {
  return (
    <div className="flex flex-row w-full justify-center">
      <ul className="flex flex-col w-full py-2 md:w-824 m-auto">
        {data &&
          data.length !== 0 &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data?.map((location: any) => (
            <LocItem
              key={location.id}
              item={location}
              onDelete={() => deleteLocation(location.id)}
              onModify={modifyLocation}
              isLogged={isLogged}
              user={user}
            />
          ))}
      </ul>
    </div>
  );
};
