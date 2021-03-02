import React, { useState, useEffect } from 'react';
import {apiKey} from '../config';

const MovieCard = ({ movie, type}) => {
    const [movieDB, setMovieDB] = useState({});

    useEffect(() => {
        const fetchDB = async () => {
        const url_2 = await `https://api.themoviedb.org/3/${type}/${movie.id}?api_key=${apiKey}`
        const res1 = await fetch(url_2);
        const data1 = await res1.json();
        setMovieDB(data1);
        console.log(movieDB);
        }

        fetchDB();
    }, [movie.id]);
    
    return (
        <div>
            <div className="card">
                <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`} 
                alt={(type === 'movie') ? movie.title + 'poster' : movie.name +'poster' }
                className='card-image' 
                />
                <div className="card-content">
                    <h3 className="card-title"><a href={`https://www.imdb.com/title/${movieDB.imdb_id}`} target="_blank" rel="noreferrer" >{(type === 'movie') ? movie.title : movie.name}</a></h3>
                    <p>
                        <small>Release Date: {(type === 'movie') ? movie.release_date : movie.first_air_date}</small>
                    </p>
                    {(!movieDB.genres)? (<p>
                        <small>Genre: Loading...</small>
                    </p>)
                    :
                    // movieDB.genres.map((genre) => 
                    (<p>
                        <small>Genre: {(movieDB.genres.map((item) => item.name)).join(', ')}</small>
                    </p>)
                    }
                    <p>
                        <small>Status: {movieDB.status}</small>
                    </p>
                    
                    <p>
                        <small>Rating: {movie.vote_average}</small>
                    </p>
                    <p>{movie.overview}</p>
                </div>
            </div>
        </div>
    );
}

export default MovieCard
