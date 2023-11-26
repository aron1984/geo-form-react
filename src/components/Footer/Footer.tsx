import { FC } from 'react';

interface Props {
  version: string;
}
export const Footer: FC<Props> = ({ version }) => {
  return (
    <div className="flex flex-row items-center justify-center bg-gray-800 text-gray-300 h-10 p-1 md:px-10 w-full fixed bottom-0">
      <div className="flex flex-row justify-between w-full text-xs">
        <span className="text-gray-500">Ronconi Alejandro</span>
        <span className="text-cyan-500">GeoForm {version}</span>
      </div>
    </div>
  );
};
