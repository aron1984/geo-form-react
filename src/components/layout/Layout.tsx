import React, { FC } from "react";
import { Navbar } from "../Navbar";
import { IPathId } from "../../utils/interfaces";
import { itemsNavbar } from "../../utils/constants";

interface Props {
  title: IPathId;
  children: React.ReactNode;
}

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    
      <div className="bg-slate-200 w-full h-full" id={title}>
        <Navbar items={itemsNavbar} />
        {children}
      </div>
    
  );
};
