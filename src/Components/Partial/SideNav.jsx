import React from "react";
import { NavLink } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

const SideNav = () => {
  return (
    <div className="w-[20%] h-full border-r-[1px] border-zinc-500 px-10 py-10">
      <div className="flex items-center gap-3">
        <i className="text-[#6556CD] text-3xl ri-tv-fill"></i>
        <h1 className="font-bold text-2xl">AshDB</h1>
      </div>
      <nav className="mt-10 flex flex-col gap-3 text-zinc-400">
        <h1 className="font-semibold text-xl mb-5">New Feeds</h1>
        <NavLink
          className="px-5 py-2 hover:bg-[#6556CD] rounded-md"
          to="/trending"
        >
          <i className="mr-1 ri-fire-fill"></i>
          Trending
        </NavLink>
        <NavLink
          className="px-5 py-2 hover:bg-[#6556CD] rounded-md"
          to="/popular"
        >
          <i className="mr-2 ri-bard-fill"></i>
          Popular
        </NavLink>
        <NavLink
          className="px-5 py-2 hover:bg-[#6556CD] rounded-md"
          to="/movie"
        >
          <i className="mr-2 ri-movie-2-fill"></i>
          Movies
        </NavLink>
        <NavLink className="px-5 py-2 hover:bg-[#6556CD] rounded-md" to="/tv">
          <i className="mr-2 ri-tv-2-fill"></i>
          TV Shows
        </NavLink>
        <NavLink
          className="px-5 py-2 hover:bg-[#6556CD] rounded-md"
          to="/person"
        >
          <i className="mr-2 ri-team-fill"></i>
          People
        </NavLink>
      </nav>
      <hr className="mt-5" />
      <nav className="mt-5 flex flex-col gap-3 text-zinc-400">
        <NavLink className="px-5 py-2 hover:bg-[#6556CD] rounded-md" to="/">
          <i className="mr-2 ri-information-fill"></i>
          About
        </NavLink>
        <NavLink className="px-5 py-2 hover:bg-[#6556CD] rounded-md" to="/">
          <i className="mr-2 ri-customer-service-line"></i>
          Contact
        </NavLink>
      </nav>
    </div>
  );
};

export default SideNav;
