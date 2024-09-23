import axios from "../Utils/Axios";
import React, { useEffect, useState } from "react";
import SideNav from './Partial/SideNav'
import TopNav from './Partial/TopNav'
import Header from './Partial/Header'
import Dropdown from './Partial/Dropdown'
import HorizontalCards from './Partial/HorizontalCards'
import Loading from './Partial/Loading'


const Home = () => {
  document.title = "SCSDB | Homepage";
  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomdata =
        data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(randomdata);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      settrending(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    GetTrending();
    !wallpaper && GetHeaderWallpaper();
  }, [category]);

  return wallpaper && trending ? (
    <>
      <SideNav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
        <TopNav />
        <Header data={wallpaper} />
        <div className="mt-16 flex justify-between px-5">
          <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>

          <Dropdown
            func={(e) => setcategory(e.target.value)}
            title="Filter"
            options={["all", "tv", "movie"]}
          ></Dropdown>
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
