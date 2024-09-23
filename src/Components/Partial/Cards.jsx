import React from "react";
import { Link, NavLink } from "react-router-dom";
import noimage from '/noimage.webp'
const Cards = ({ data, title }) => {
  return (
    <div className="w-full px-16 flex justify-between flex-wrap">
      <Link
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        className="fixed bottom-[2%] right-[0%] flex justify-center items-center w-[5vh] h-[5vh] bg-[#6556cd] rounded-lg"
      >
        <i className="text-white ri-arrow-up-line text-xl"></i>
      </Link>
      {data.map((data, i) => (
        <NavLink key={i} to={`/${data.media_type || title}/details/${data.id}`}>
          <div className={`w-52 relative bg-zinc-800 mt-7`}>
            <img
              className="h-[30vh] w-full object-cover"
              src={
                data.backdrop_path || data.poster_path || data.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      data.backdrop_path ||
                      data.poster_path ||
                      data.profile_path
                    }`
                  : noimage
              }
              alt=""
            />

            <div className="p-2 flex h-[12vh] items-center">
              <h1 className="text-xl font-bold leading-5">
                {data.name ||
                  data.original_name ||
                  data.title ||
                  data.original_title}
              </h1>
            </div>

            {data.vote_average > 0 && (
              <div className="py-3 w-[50px] bg-yellow-400 flex items-center justify-center absolute bottom-[30%] right-[-10%] rounded-full text-zinc-800 text-xl">
                {(data.vote_average * 10).toFixed()} <sup>%</sup>
              </div>
            )}
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Cards;
