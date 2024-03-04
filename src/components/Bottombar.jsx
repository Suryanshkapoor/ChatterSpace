import React from "react";
import { bottombarLinks } from "../constants";
import { Link, useLocation } from "react-router-dom";

const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <section className='bg-zinc-950 fixed bottom-0 z-50 w-full md:hidden'>
      <div className="flex py-4 px-5 justify-around">
        {bottombarLinks.map((link) => {
          const isActive = pathname === link.route;
          return (
            <Link
              to={link.route}
              key={link.label}
              className={`flex flex-col gap-1 items-center rounded-lg px-5 py-3  hover:bg-violet-600 transition ${
                isActive && "bg-violet-600"
              }`}
            >
              <img
                width={16}
                height={16}
                className={`group-hover:invert group-hover:brightness-0 group-hover:transition ${
                  isActive && "invert brightness-0 transition"
                }`}
                src={link.imgURL}
                alt={link.label}
              />
              <p className="text-xs">{link.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Bottombar;
