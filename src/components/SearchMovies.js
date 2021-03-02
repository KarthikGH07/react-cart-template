import React, { useState } from "react";
import { apiKey } from "../config";
import MovieCard from "./MovieCard";
import TvCard from "./TvCard";
import Search from "./TypeToggle";

const SearchMovies = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState();
  const [tv, setTv] = useState();
  const [type, setType] = useState("movie");

  function main(e) {
    e.preventDefault();
    searchMovies();
    // searchMoviesDB();
  }
  const searchMovies = async () => {
    const url = `https://api.themoviedb.org/3/search/${type}?api_key=${apiKey}&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      if (type === "movie") setMovies(data.results);
      else setTv(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const updateTypeChange = (newType) => {
    setType(newType);
  };

  return (
    <>
      <form className="form" id="form" onSubmit={main}>
        {/* <label htmlFor="query" className='label'>
                Movie / TV show Name:
            </label> */}
        <input
          type="text"
          name="query"
          className="input"
          placeholder="e.g. Uncut Gems..."
          value={query}
          onChange={handleChange}
        />
        <Search type={type} updateTypeChange={updateTypeChange} />
        <button type="submit" className="button">
          Search
        </button>
      </form>
      <div className="card-list">
        {type === "movie" ? (
          movies ? (
            movies.length === 0 ? (
              <div className="card">
                <div className="card-content">
                  <h3 className="card-title">No Data Found!!</h3>
                </div>
              </div>
            ) : (
              movies
                .filter((movie) => movie.poster_path)
                .map((movie) => {
                  return <MovieCard key={movie.id} movie={movie} type={type} />;
                })
            )
          ) : null
        ) : tv ? (
          tv.length === 0 ? (
            <div className="card">
              <div className="card-content">
                <h3 className="card-title">No Data Found!!</h3>
              </div>
            </div>
          ) : (
            tv
              .filter((tv) => tv.poster_path)
              .map((tv) => {
                return <TvCard key={tv.id} tv={tv} type={type} />;
              })
          )
        ) : null}
      </div>
    </>
  );
};

export default SearchMovies;
