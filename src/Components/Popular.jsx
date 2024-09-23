import axios from "../Utils/Axios";
import React, { useEffect } from "react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import TopNav from './Partial/TopNav'
import Cards from './Partial/Cards'
import Dropdown from './Partial/Dropdown'
import Loading from './Partial/Loading'

const Popular = () => {
  document.title = "AshDB | Popular";

  const navigate = useNavigate();
  const [category, setcategory] = useState("tv");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);
      if (data.results.length > 0) {
        setpopular((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refershHandler = () => {
    if (popular.length === 0) {
      GetPopular();
    } else {
      setpage(1);
      setpopular([]);
      GetPopular();
    }
  };

  useEffect(() => {
    refershHandler();
  }, [category]);

  return popular.length > 0 ? (
    <div className="w-screen min-h-screen pt-5">
      <div className="w-full px-[5%] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <i
            onClick={() => navigate(-1)}
            className="text-3xl ri-arrow-left-circle-fill cursor-pointer"
          ></i>
          <h1 className="text-2xl font-bold w-32">Popular</h1>
        </div>
        <div className="flex items-center justify-end gap-5 w-[90%]">
          <TopNav></TopNav>
          <Dropdown
            title="Catgory"
            options={["tv", "movie"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={popular.length}
        next={GetPopular}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;
