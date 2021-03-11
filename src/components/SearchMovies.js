import React, { useState, useRef } from "react";
import { apiKey } from "../config";
import MovieCard from "./MovieCard";
import TvCard from "./TvCard";
// import Search from "./TypeToggle";

const SearchMovies = () => {
  const [query, setQuery] = useState("");
  // const [movies, setMovies] = useState();
  // const [tv, setTv] = useState();
  // const [type, setType] = useState("movie");
  const [fetchedData, setFetchedData] = useState();
  const [type, setType] = useState("");
  const buttonRef = useRef(null);

  function main(e) {
    e.preventDefault();
    searchMovies();
    // searchMoviesDB();
  }
  const searchMovies = async () => {
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}&page=1&include_adult=true`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setFetchedData(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
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
        {/* <Search type={type} updateTypeChange={updateTypeChange} /> */}
        <button type="submit" className="button" ref={buttonRef}>
          Search
        </button>
      </form>
      <div className="card-list">
        {fetchedData ? (
          fetchedData.length === 0 ? (
            <div className="card">
              <div className="card-content">
                <h3 className="card-title">No Data Found!!</h3>
              </div>
            </div>
          ) : (
            fetchedData
              .filter((data) => data.poster_path)
              .map((data) => {
                const media_type = data.media_type;
                return (
                  <MovieCard key={data.id} movie={data} type={media_type} />
                );
              })
          )
        ) : null}
      </div>
    </>
  );
};

export default SearchMovies;
