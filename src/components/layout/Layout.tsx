import React, { FC } from "react";
import { Navbar } from "../Navbar";
import { IPathId } from "../../utils/interfaces";
import {itemsNavbar, VERSION} from "../../utils/constants";
import {Footer} from "../Footer";

interface Props {
  title: IPathId;
  children: React.ReactNode;
  subtitle?: string;
}

export const Layout: FC<Props> = ({ children, title, subtitle }) => {
  return (
    <div className="bg-slate-200 w-full min-h-screen flex flex-col pb-20" id={title}>
      <Navbar items={itemsNavbar} />
      {subtitle && (
        <div className="relative top-10 md:top-20">
          <div className="flex items-center justify-start p-1 md:p-3 border-b-2 border-gray-800">
            <h1 className="text-gray-800 text-sm md:text-xl font-bold">{subtitle}</h1>
          </div>
        </div>
      )}
      {children}

      <Footer version={VERSION} />
    </div>
  );
};
