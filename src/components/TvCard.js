import React, { useState, useEffect } from "react";
import { apiKey } from "../config";

const TvCard = ({ tv, type }) => {
  const [tvDB, setTvDB] = useState({});

  useEffect(() => {
    const fetchDB = async () => {
      const url_2 = await `https://api.themoviedb.org/3/${type}/${tv.id}?api_key=${apiKey}`;
      const res1 = await fetch(url_2);
      const data1 = await res1.json();
      setTvDB(data1);
      console.log(tvDB);
    };

    fetchDB();
  }, [tv.id]);

  return (
    <div>
      <div className="card">
        <img
          src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${tv.poster_path}`}
          alt={tv.name + "poster"}
          className="card-image"
        />
        <div className="card-content">
          <h3 className="card-title">
            <a>
              {/* //   href={`https://www.imdb.com/title/${tvDB.imdb_id}`}
            //   target="_blank"
            //   rel="noreferrer"
            // >  */}
              {tv.name}
            </a>
          </h3>
          <p>
            <small>Release Date: {tv.first_air_date}</small>
          </p>
          {!tvDB.genres ? (
            <p>
              <small>Genre: Loading...</small>
            </p>
          ) : (
            // tvDB.genres.map((genre) =>
            <p>
              <small>
                Genre: {tvDB.genres.map((item) => item.name).join(", ")}
              </small>
            </p>
          )}
          <p>
            <small>Status: {tvDB.status}</small>
          </p>

          <p>
            <small>Rating: {tv.vote_average}</small>
          </p>
          <p>{tv.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default TvCard;
