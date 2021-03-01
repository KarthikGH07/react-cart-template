import React from 'react'

const MovieCard = ({ movie }) => {

    return (
        <div>
            <div className="card">
                <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`} 
                alt={movie.title + 'poster' }
                className='card-image' 
                />
                <div className="card-content">
                    <h3 className="card-title">{movie.title}</h3>
                </div>
            </div>
        </div>
    )
}

export default MovieCard
