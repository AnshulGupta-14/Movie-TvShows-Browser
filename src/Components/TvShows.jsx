import React, { useEffect, useState } from "react";
import Loading from "./Partial/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "../Utils/Axios";
import { useNavigate } from "react-router-dom";
import TopNav from './Partial/TopNav';
import Cards from './Partial/Cards';
import Dropdown from './Partial/Dropdown';

const TvShows = () => {
  document.title = "SCSDB | Tv Shows";

  const navigate = useNavigate();
  const [category, setcategory] = useState("airing_today");
  const [tv, settv] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const GetTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        settv((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refershHandler = () => {
    if (tv.length === 0) {
      GetTv();
    } else {
      setpage(1);
      settv([]);
      GetTv();
    }
  };

  useEffect(() => {
    refershHandler();
  }, [category]);

  return tv.length > 0 ? (
    <div className="w-screen min-h-screen pt-5">
      <div className="px-16 w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <i
            onClick={() => navigate(-1)}
            className="text-3xl ri-arrow-left-circle-fill cursor-pointer"
          ></i>
          <h1 className="text-2xl font-bold w-32">Tv Shows</h1>
        </div>
        <div className="flex items-center justify-end gap-5 w-[90%]">
          <TopNav></TopNav>
          <Dropdown
            title="Category"
            options={["airing_today", "on_the_air", "top_rated", "popular"]}
            func={(e) => setcategory(e.target.value)}
          ></Dropdown>
        </div>
      </div>

      <InfiniteScroll
        dataLength={tv.length}
        next={GetTv}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default TvShows;
