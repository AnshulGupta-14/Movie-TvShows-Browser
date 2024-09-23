import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import {asyncloadmovie,removemovie} from '../Store/Actions/MovieAction'
import HorizontalCards from './Partial/HorizontalCards'
import Loading from './Partial/Loading'

const MovieDetails = () => {
  document.title = "AshDB | Movie Details";

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5), rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-full min-h-[100vh] px-[5%] py-3"
    >
      {/* Part 1 navigation */}
      <nav className="w-full h-[10vh] flex items-center gap-10">
        <Link>
          <i
            onClick={() => navigate(-1)}
            className="text-3xl ri-arrow-left-circle-fill cursor-pointer"
          ></i>
        </Link>
        <a
          className="text-2xl font-black"
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          imdb
        </a>
        <a
          className="font-black"
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="text-2xl ri-earth-fill"></i>
        </a>
        <a className="font-black" target="_blank" href={info.detail.homepage}>
          <i className="text-2xl ri-external-link-fill"></i>
        </a>
      </nav>

      {/* Part 2 Poster and details */}
      <div className="w-full py-2 flex">
        <div className="left w-[30%]">
          <img
            className="h-[55vh] w-full object-cover"
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.poster_path || info.detail.backdrop_path
            }`}
            alt=""
          />
          <div className="pt-5 rounded-lg w-full">
            {info.watchproviders && info.watchproviders.flatrate && (
              <div className="w-full flex gap-2 items-center ">
                <h1 className="text-medium leading-4 text-white font-semibold w-[33%] text-center">
                  Available on Platforms
                </h1>
                {info.watchproviders.flatrate.map((data, idx) => {
                  return (
                    <img
                      title={data.provider_name}
                      className="w-[3vw] rounded-lg cursor-pointer"
                      key={idx}
                      src={`https://image.tmdb.org/t/p/original/${data.logo_path}`}
                      alt=""
                    />
                  );
                })}
              </div>
            )}
            {info.watchproviders && info.watchproviders.rent && (
              <div className="w-full flex gap-2 mt-3 items-center ">
                <h1 className="text-medium leading-4 text-white font-semibold w-[33%] text-center">
                  Available on Rent
                </h1>
                {info.watchproviders.rent.map((data, idx) => {
                  return (
                    <img
                      title={data.provider_name}
                      className="w-[3vw] rounded-lg cursor-pointer"
                      key={idx}
                      src={`https://image.tmdb.org/t/p/original/${data.logo_path}`}
                      alt=""
                    />
                  );
                })}
              </div>
            )}
            {info.watchproviders && info.watchproviders.buy && (
              <div className="w-full flex gap-2 mt-3 items-center ">
                <h1 className="text-medium leading-4 text-white font-semibold w-[33%] text-center">
                  Available to Buy
                </h1>
                {info.watchproviders.buy.map((data, idx) => {
                  return (
                    <img
                      title={data.provider_name}
                      className="w-[3vw] rounded-lg cursor-pointer"
                      key={idx}
                      src={`https://image.tmdb.org/t/p/original/${data.logo_path}`}
                      alt=""
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="right pl-10 w-[70%] text-sm">
          <h1 className="text-3xl font-bold">
            {info.detail.title || info.detail.original_title}
          </h1>
          <div className="mt-2 text-zinc-200 font-semibold">
            <h1>{info.detail.genres.map((g) => g.name).join(", ")}</h1>
            <h1>Release Date: {info.detail.release_date}</h1>
            <h1>Duration: {info.detail.runtime}min</h1>
          </div>

          <h1 className="mt-3 text-2xl font-semibold text-zinc-100">
            {info.detail.tagline}
          </h1>
          <div>
            <h1 className="mt-3 text-2xl font-semibold text-zinc-100">
              Overview
            </h1>
            <p className="mt-2 text-zinc-200">{info.detail.overview}</p>
          </div>
          <div className="">
            <h1 className="mt-3 text-2xl font-semibold text-zinc-100">
              Movie Translated
            </h1>
            <h1 className="mt-2 text-zinc-200">
              {info.translations.map((lan) => lan.english_name).join(", ")}
            </h1>
          </div>
          <div className="mt-7 flex items-center">
            <Link
              to={`${pathname}/trailer`}
              className="rounded-xl bg-[#6556ca] p-5 font-bold"
            >
              <i className="mr-2 ri-play-large-fill"></i>
              Watch Trailer
            </Link>
          </div>
        </div>
      </div>

      {/* Part 3 Recommendations and Similar Stuff */}
      <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
      <h1 className="text-3xl font-bold text-white">
        Recommendations & Similar stuff
      </h1>
      <HorizontalCards
        title="movie"
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
