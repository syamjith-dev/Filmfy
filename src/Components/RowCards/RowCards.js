import React, { useEffect, useState, useContext } from 'react'
import "./RowCards.css"
import axios from "../../axios"
import { imageUrl } from '../../Constants/Constants'
import { PlayerContext } from '../../Context/PlayerContext';

const RowCards = () => {

  const [movie, setMovies] = useState([])

  const { setUrlId } = useContext(PlayerContext);


  // FETCH MOVIES
  useEffect(() => {

    axios.get(`discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=35`)
      .then((response) => {
        setMovies(response.data.results);

      })


  }, []);

  const handleMovie = (id) => {

    axios
      .get(`/movie/${id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`)
      .then((response) => {

        if (response.data.results.length > 0) {
          console.log(response.data.results)

          setUrlId(response.data.results[0].key);

        }

      })

  }



  return (

    <div className='cards-row'>

      {movie.map((obj, index) => (

        <div
          key={index}
          className='card-container'
          onClick={() => handleMovie(obj.id)}
        >

          <img
            src={`${imageUrl + obj.backdrop_path}`}
            alt='movies'
            className='cards'
          />

          <div className="name-bg">
            <div className='movie-name'>
              {obj.title || obj.name}
            </div>
          </div>

        </div>

      ))}

    </div>


  )
}

export default RowCards
