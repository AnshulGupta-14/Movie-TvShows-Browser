import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {asyncloadperson,removeperson} from '../Store/Actions/PeopleAction'
import HorizontalCards from './Partial/HorizontalCards'
import Dropdown from './Partial/Dropdown'
import Loading from './Partial/Loading'

const PersonDetails = () => {
  document.title = "SCSDB | Person Details";

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const [category, setcategory] = useState("tv");

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  return info ? (
    <div className="w-full px-[5%] py-[2%] flex">
      {/* Part 2 left Poster and Details */}
      <div className="letf w-[30%]">
        <nav className="w-full h-[10vh] text-3xl flex items-center gap-7">
          <Link>
            <i
              onClick={() => navigate(-1)}
              className=" ri-arrow-left-circle-fill cursor-pointer"
            ></i>
          </Link>
          {info.externalid.facebook_id && (
            <a
              className=" font-black"
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}/`}
            >
              <i className=" ri-facebook-circle-fill"></i>
            </a>
          )}
          {info.externalid.wikidata_id && (
            <a
              className="font-black"
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className=" ri-earth-line"></i>
            </a>
          )}
          {info.externalid.instagram_id && (
            <a
              className="font-black"
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}/`}
            >
              <i className=" ri-instagram-fill"></i>
            </a>
          )}
          {info.externalid.twitter_id && (
            <a
              className="font-black"
              target="_blank"
              href={`https://x.com/${info.externalid.twitter_id}/`}
            >
              <i className=" ri-twitter-x-line"></i>
            </a>
          )}
          {info.externalid.youtube_id && (
            <a
              className="font-black"
              target="_blank"
              href={`https://www.youtube.com/@${info.externalid.youtube_id}`}
            >
              <i className=" ri-youtube-fill"></i>
            </a>
          )}
        </nav>
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] w-full h-[50vh] object-cover"
          src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
          alt=""
        />
        {/* Personal Information */}
        <div className="w-full ">
          <h1 className="text-2xl text-zinc-400 font-semibold my-5">
            Person Info
          </h1>
          <h1 className="text-sm text-zinc-400 font-semibold ">
            Known For : {info.detail.known_for_department}
          </h1>
          <h1 className="text-sm text-zinc-400 font-semibold mt-1">
            Gender : {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>
          <h1 className="text-sm text-zinc-400 font-semibold mt-1">
            Birthday : {info.detail.birthday}
          </h1>
          <h1 className="text-sm text-zinc-400 font-semibold mt-1">
            Deathday :{" "}
            {info.detail.deathday ? info.detail.deathday : "Still Alive"}
          </h1>
          <h1 className="text-sm text-zinc-400 font-semibold mt-1">
            Place Of Birth : {info.detail.place_of_birth}
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-1 ">
            Also Known As
          </h1>
          <h1 className="text-sm text-zinc-400 ">
            {info.detail.also_known_as.join(", ")}
          </h1>
        </div>
      </div>

      {/* Part 3 right Details and information  */}
      <div className="w-[70%] pl-[5%]">
        <h1 className="text-6xl text-zinc-400 font-black my-5">
          {info.detail.name}
        </h1>

        <h1 className="text-xl text-zinc-400 font-semibold ">Biography</h1>
        <p className="text-zinc-400 mt-3 ">{info.detail.biography}</p>

        <h1 className="mt-5 text-lg text-zinc-400 font-semibold ">Known For</h1>
        <HorizontalCards data={info.combinedCredits.cast} />

        <div className="w-full flex items-center justify-between mt-7">
          <h1 className="text-xl text-zinc-400 font-semibold ">Acting</h1>

          <Dropdown
            title="Catgory"
            options={["tv", "movie"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>

        <div className="list-disc text-zinc-400 w-full h-[50vh] mt-5 overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.3)] border-2 border-zinc-700 p-5">
          {info[category + "Credits"].cast.map((c, i) => (
            <li
              key={i}
              className="hover:text-white p-5 rounded hover:bg-[#19191d]  duration-300 cursor-pointer"
            >
              <Link to={`/${category}/details/${c.id}`} className="">
                <span>
                  {" "}
                  {c.name || c.title || c.original_name || c.original_title}
                </span>

                <span className="block ml-5 mt-2">
                  {c.character && `Character Name:  ${c.character}`}
                </span>
              </Link>
            </li>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
