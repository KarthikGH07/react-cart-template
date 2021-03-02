import React from 'react'

const Search = ({type, updateTypeChange}) => {
    return (
    <React.Fragment>
    {/* <span className="switch">
    <input type="checkbox" className="slider" id="switch-id"/>
    </span>

    <span className="switch">
    <input type="checkbox" className="switch" id="switch-id"/>
    <label for="switch-id">Small switch</label>
    </span> */}


      <div className="form-check">
        <input
        className="form-check-input"
        type="radio"
        name="type"
        id="movie"
        value="movie"
        checked={type === "movie"}
        onChange={event => updateTypeChange(event.target.value)}/>
        <label className="form-check-label" htmlFor="movie">Movie</label>
      </div>
      <div className="form-check">
        <input
        className="form-check-input"
        type="radio"
        name="type"
        id="tvshow"
        value="tv"
        checked={type === "tv"}
        onChange={event => updateTypeChange(event.target.value)}/>
        <label className="form-check-label" htmlFor="tvshow">TV</label>
      </div>
    </React.Fragment>
    )
}

export default Search
