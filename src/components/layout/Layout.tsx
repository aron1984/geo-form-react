import React, { FC } from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <div>
      <p>{title}</p>
      {children}
    </div>
  );
};
