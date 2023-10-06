import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
// import { itemsNavbar as items } from "../../utils/constants";
import { IItems } from "../../utils/interfaces";

interface Props {
  items: IItems[];
}

export const Navbar: FC<Props> = ({ items }) => {
  const location = useLocation();

  return (
    <div className="bg-slate-800 h-10 md:h-20 shadow-lg w-full z-50 fixed">
      <div className="flex h-full items-center justify-between">
        <img
          src="/img/g-logo_myv.svg"
          alt="Geo Form"
          className="px-2 h-6 md:pl-5 md:h-8"
        />
        <ul className="flex gap-2 h-full ">
          {items.map(({ id, path }) => (
            <li
              key={id}
              className={
                location.pathname === path
                  ? "flex items-center px-3 text-cyan-300 font-semibold text-xs md:text-lg"
                  : "flex items-center px-3 text-slate-300 font-semibold hover:text-emerald-400 text-xs md:text-lg"
              }
            >
              <Link to={path}>{id.toUpperCase()}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
