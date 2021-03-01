import React, { useState } from 'react';
import { apiKey } from '../config';
import MovieCard from './MovieCard';


const SearchMovies = () => {

    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    

function main(e) {
    e.preventDefault();
    searchMovies();
    // searchMoviesDB();
    
    
}
    const searchMovies = async () => {

        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=1&include_adult=false`;

        try{
            const res = await fetch(url);
            const data = await res.json();
            // console.log(data);
            setMovies(data.results);
        } catch(err) {
            console.log(err);
        }
    };
    
    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <>
        <form className='form' onSubmit={main}>
            <label htmlFor="query" className='label'>
                Movie Name:
            </label>
            <input 
                type="text" 
                name="query"  
                className="input" 
                placeholder='e.g. Uncut Gems...'
                value={query}
                onChange={handleChange}
                />
            
            <button type="submit" className='button'>Search</button>
        </form>
        <div className="card-list">
            { movies
                .filter((movie) => movie.poster_path)
                .map((movie) => {
                    return <MovieCard key={movie.id} movie={movie}/>
                })

            }
        </div>
        </>
    );
}

export default SearchMovies
