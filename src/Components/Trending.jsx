import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./Partial/Cards";
import Loading from "./Partial/Loading";
import Dropdown from "./Partial/Dropdown";
import TopNav from "./Partial/TopNav";
import axios from "../Utils/Axios";
import { useNavigate } from "react-router-dom";

const Trending = () => {
  document.title = "SCSDB | Trending";
  const navigate = useNavigate();
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );

      if (data.results.length > 0) {
        settrending((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refershHandler = () => {
    if (trending.length === 0) {
      GetTrending();
    } else {
      setpage(1);
      settrending([]);
      GetTrending();
    }
  };

  useEffect(() => {
    refershHandler();
  }, [category,duration]);

  return trending.length > 0 ? (
    <div className="w-screen pt-5 min-h-screen ">
      <div className="px-16 w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <i
            onClick={() => navigate(-1)}
            className="text-3xl ri-arrow-left-circle-fill cursor-pointer"
          ></i>
          <h1 className="text-2xl font-bold w-32">Trending</h1>
        </div>
        <div className="flex items-center justify-end gap-5 w-[90%]">
          <TopNav></TopNav>
          <div className="flex w-[50%] gap-5">
            <Dropdown
              title={"Filter"}
              options={["all", "movie", "tv"]}
              func={(e) => setcategory(e.target.value)}
            ></Dropdown>
            <Dropdown
              title={"Duration"}
              options={["day", "week"]}
              func={(e) => setduration(e.target.value)}
            ></Dropdown>
          </div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
