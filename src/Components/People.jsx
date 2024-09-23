import axios from "../Utils/Axios";
import React, { useEffect } from "react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import TopNav from './Partial/TopNav'
import Cards from './Partial/Cards'
import Loading from './Partial/Loading'

const People = () => {
  document.title = "SCSDB | person Shows";

  const navigate = useNavigate();
  const [category, setcategory] = useState("popular");
  const [person, setperson] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const GetPerson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      if (data.results.length > 0) {
        setperson((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refershHandler = () => {
    if (person.length === 0) {
      GetPerson();
    } else {
      setpage(1);
      setperson([]);
      GetPerson();
    }
  };

  useEffect(() => {
    refershHandler();
  }, [category]);
  console.log(person);

  return person.length > 0 ? (
    <div className="w-screen min-h-screen ">
      <div className="px-16 pt-5 w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <i
            onClick={() => navigate(-1)}
            className="text-3xl ri-arrow-left-circle-fill cursor-pointer"
          ></i>
          <h1 className="text-2xl font-bold w-32">People</h1>
        </div>
        <div className="flex items-center justify-end gap-5 w-[90%]">
          <TopNav></TopNav>
        </div>
      </div>

      <InfiniteScroll
        dataLength={person.length}
        next={GetPerson}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={person} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
