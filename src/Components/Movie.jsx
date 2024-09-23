import axios from "../Utils/Axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from './Partial/TopNav'
import Dropdown from './Partial/Dropdown'
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from './Partial/Cards'
    
const Movie = () => {
    document.title = "AshDB | Movie";
  const navigate = useNavigate();
  const [Movie, setMovie] = useState([]);
  const [category, setCategory] = useState("now_playing");
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const getMovie = () => {
    axios
      .get(`/movie/${category}?page=${page}`)
      .then((response) => {
        if (response.data.results.length) {
          setMovie((prev) => [...prev, ...response.data.results]);
          setpage((prev) => prev + 1);
        } else {
          sethasMore(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const refreshHandler = () => {
    if (Movie.length) {
      setpage(1);
      setMovie([]);
    }
    getMovie();
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return (
    <div className=" w-full pt-5 h-full oveflow-y-auto">
      <div className="px-16 w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <i
            onClick={() => navigate(-1)}
            className="text-3xl ri-arrow-left-circle-fill cursor-pointer"
          ></i>
          <h1 className="text-2xl font-bold w-32">Movie</h1>
        </div>
        <div className="flex items-center justify-end gap-5 w-[90%]">
          <TopNav></TopNav>
          <Dropdown
            title="Category"
            options={["now_playing", "upcoming", "top_rated", "popular"]}
            func={(e) => setCategory(e.target.value)}
          ></Dropdown>
        </div>
      </div>
      {Movie && (
        <InfiniteScroll
          dataLength={Movie.length}
          next={getMovie}
          hasMore={hasMore}
        >
          <Cards data={Movie} title={"movie"}></Cards>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Movie;
