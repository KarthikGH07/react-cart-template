import React, { useState, useEffect } from "react";
import { apiKey } from "../config";
import { getImdbId } from "../util/utils";

const MovieCard = ({ movie, type }) => {
  const [movieDB, setMovieDB] = useState({});

  const filterData = async (data, type) => {
    let title, imdb_id, release_date;
    title = type === "movie" ? data.title : data.original_name;
    // const tvImdbId =
    imdb_id =
      type === "movie" ? data.imdb_id : await getImdbId(data.original_name);
    release_date = type === "movie" ? data.release_date : data.first_air_date;

    return { title, imdb_id, release_date };
  };

  useEffect(() => {
    const fetchDB = async () => {
      const url_2 = await `https://api.themoviedb.org/3/${type}/${movie.id}?api_key=${apiKey}`;
      const res = await fetch(url_2);
      const data1 = await res.json();
      const filteredData = await filterData(data1, type);
      setMovieDB({
        type: type,
        id: movie.id,
        title: filteredData.title,
        imdb_id: filteredData.imdb_id,
        release_date: filteredData.release_date,
        genres: data1.genres,
        status: data1.status,
        rating: data1.vote_average,
        poster_path: data1.poster_path,
      });
    };

    fetchDB();
  }, [movie.id]);

  return (
    <div>
      <div className="card">
        <img
          src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movieDB.poster_path}`}
          alt={movieDB.title + " poster"}
          className="card-image"
        />
        <div className="card-content">
          <h3 className="card-title">
            <a
              href={`https://www.imdb.com/title/${movieDB.imdb_id}`}
              target="_blank"
              rel="noreferrer"
            >
              {movieDB.title}
            </a>
            <sup>{movieDB.type}</sup>
          </h3>
          <p>
            <small>Release Date: {movieDB.release_date}</small>
          </p>
          {!movieDB.genres ? (
            <p>
              <small>Genre: Loading...</small>
            </p>
          ) : (
            // movieDB.genres.map((genre) =>
            <p>
              <small>
                Genre: {movieDB.genres.map((item) => item.name).join(", ")}
              </small>
            </p>
          )}
          <p>
            <small>Status: {movieDB.status}</small>
          </p>

          <p>
            <small>Rating: {movieDB.rating}</small>
          </p>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
