import React, { FC } from "react";
import { Navbar } from "../Navbar";

interface Props {
  title: string;
  children: React.ReactNode;
}

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    
      <div className="bg-slate-200 w-full h-full">
        <Navbar />
        {children}
      </div>
    
  );
};
