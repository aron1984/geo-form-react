import { FC } from "react";
import { IGeoData } from "../../utils/interfaces";
import { LocItem } from "./LocItem";

interface IData {
  data: IGeoData[] | unknown[] | null;
}

export const ListLocation: FC<IData> = ({ data }) => {
  return (
    <div className="flex flex-row w-full justify-center">
      <ul className="flex flex-col w-full p-2 md:w-824 m-auto">
        {data &&
          data.length !== 0 &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data?.map((location: any, index) => (
            <LocItem key={index} item={location} />
          ))}
      </ul>
    </div>
  );
};
