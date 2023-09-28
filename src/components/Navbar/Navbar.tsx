import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const items = ["home", "places", "about"];
  return (
    <div className="bg-slate-800 h-10 md:h-20 shadow-lg w-full z-50 fixed">
      <div className="flex h-full items-center justify-between">
        <img
          src="/img/g-logo_myv.svg"
          alt="Geo Form"
          className="px-2 h-6 md:pl-5 md:h-8"
        />
        <ul className="flex gap-2 h-full ">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-center px-3 text-slate-300 font-semibold hover:text-emerald-400 text-xs md:text-lg"
            >
              <Link to={`/${item}`}>{item.toUpperCase()}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
