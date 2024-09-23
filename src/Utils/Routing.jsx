import React from "react";
import Home from '../Components/Home'
import Trending from '../Components/Trending'
import Popular from '../Components/Popular'
import Movie from '../Components/Movie'
import MovieDetails from '../Components/MovieDetails'
import Trailer from '../Components/Partial/Trailer'
import TvShows from '../Components/TvShows'
import TvDetails from '../Components/TvDetails'
import People from '../Components/People'
import PersonDetails from '../Components/PersonDetails'
import NotFound from '../Components/Partial/NotFound'
import { Route, Routes } from "react-router-dom";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trending" element={<Trending />} />
      <Route path="/popular" element={<Popular />} />
      <Route path="/movie" element={<Movie />} />
      <Route path="/movie/details/:id" element={<MovieDetails />}>
        <Route path="/movie/details/:id/trailer" element={<Trailer />} />
      </Route>
      <Route path="/tv" element={<TvShows />} />
      <Route path="/tv/details/:id" element={<TvDetails />}>
        <Route path="/tv/details/:id/trailer" element={<Trailer />} />
      </Route>
      <Route path="/person" element={<People />} />
      <Route path="/person/details/:id" element={<PersonDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routing;
