import React, { useEffect, useState } from 'react'
import "./Banner.css";
import axios from '../../axios';
// import { Api_Key } from '../../Constants/Constants';
import { imageUrl } from '../../Constants/Constants';
import { useContext } from 'react';
import { PlayerContext } from '../../Context/PlayerContext';

const Banner = () => {
    const [movie, setMovie] = useState({})
    const { setUrlId } = useContext(PlayerContext);
    useEffect(() => {
        axios.get(`/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=35`).then((response) => {
            const result = response.data.results;
            const randomIndex = Math.floor(Math.random() * result.length);
            setMovie(result[randomIndex]);
        })
    }, [])
    const handleMovie = (id) => {
        console.log(id)
        axios.get(`/movie/${id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`).then((response) => {
            if (response.data.results.length !== 0) {
                console.log(response.data.results)
                setUrlId(response.data.results[0].key)
            } else {
                console.log("trailer not available")
            }

        })
    }

    return (
        <div style={{ backgroundImage: movie?.backdrop_path ? `url(${imageUrl}${movie.backdrop_path})` : "none", }} className="banner">
            <div className='content'>
                <h1 className='tittle'>{movie.title || movie.name}</h1>
                <div className="banner_buttons">
                    <button onClick={() => handleMovie(movie.id)}
                        className="button"><i className="bxf bx-play" />Play</button>
                    <button className="button"><i className="bxf bx-list-play" />My list</button>
                </div>
                <p className="discription">{movie ? movie.overview : ""} </p>
            </div>
            {/* mobile-view */}
            <div className="banner-mob" 
            style={{ backgroundImage: movie?.backdrop_path ? `url(${imageUrl}${movie.backdrop_path})` : "none", }}>
                <div className="title-bg-mob">
                    <h1 className='mob-title'>{movie.title || movie.name}</h1>
                </div>
            </div>
            <div className="banner_buttons-mob">
                    <button onClick={() => handleMovie(movie.id)}
                        className="button"><i className="bxf bx-play" />Play</button>
                    <button className="button"><i className="bxf bx-list-play" />My list</button>
            </div>

        </div>

    )
}

export default Banner
