import axios from "../../Utils/Axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.webp";

const TopNav = () => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState([]);

  const getSearch = () => {
    axios
      .get(`/search/multi?query=${query}`)
      .then((response) => {
        setSearch(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSearch();
  }, [query]);

  return (
    <div className="relative w-[50%] h-[10vh] mx-auto flex items-center gap-7">
      <i className="text-xl ri-search-line"></i>
      <input
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        className="w-[90%] outline-none border-none bg-transparent text-xl"
        value={query}
        type="text"
        placeholder="search anything"
      />
      {query.length > 0 && (
        <i onClick={() => setQuery("")} className="text-xl ri-close-line"></i>
      )}
      <div className="absolute w-[80%] z-50 max-h-[50vh] bg-zinc-200 text-black text-xl top-[100%] left-[7%] overflow-auto">
        {search.map((s, i) => {
          return (
            <Link
              to={`/${s.media_type}/details/${s.id}`}
              key={i}
              className="p-5 w-full bg-zinc-300 p-8 hover:bg-zinc-400 hover:font-semibold border-b-2 border-white duration-300 flex items-center justify-start"
            >
              <img
                className="w-[5vw] h-[10vh] object-cover object-center rounded-full mr-10 shadow-xl"
                src={
                  s.backdrop_path || s.profile_path || s.poster_path
                    ? `https://image.tmdb.org/t/p/original/${
                        s.backdrop_path || s.profile_path || s.poster_path
                      }`
                    : noimage
                }
                alt=""
              />
              <span>
                {s.name || s.original_name || s.title || s.original_title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TopNav;
