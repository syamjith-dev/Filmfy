import React, { useEffect, useState, useContext, useRef } from 'react'
import "./RowCards.css"
import axios from "../../axios"
import { imageUrl } from '../../Constants/Constants'
import { PlayerContext } from '../../Context/PlayerContext';

const RowCards = () => {

  const [movie, setMovies] = useState([])

  const { setUrlId } = useContext(PlayerContext);

  const rowRef = useRef();


  // FETCH MOVIES
  useEffect(() => {
    axios.get(`discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_original_language=ml&sort_by=popularity.desc&page=3`)
      .then((response) => {
        setMovies(response.data.results);
        console.log(response.data.results)
      })


  }, []);

  const handleMovie = (id) => {

    axios
      .get(`/movie/${id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`)
      .then((response) => {

        if (response.data.results.length > 0) {
          console.log(response.data.results)
          setUrlId(response.data.results[0].key);

        } else {
          console.log("trailer not available!")
          alert("Sorry trailer is not available!")
        }

      })

  }

  const scrollLeft = () => {
    rowRef.current.scrollLeft -= 300;
  };

  const scrollRight = () => {
    rowRef.current.scrollLeft += 300;
  };

  const rightArrow = document.getElementById("right");
  const leftArrow = document.getElementById("left");

  if (rightArrow && leftArrow) {

    rightArrow.addEventListener("click", () => {
      leftArrow.style.display = "block";
    });

  }


  return (
    <div>
      <i id='left' onClick={scrollLeft}
        class="bx bx-caret-left" style={{ display: 'none' }} />

      <div className='cards-row' ref={rowRef}>

        {movie.map((obj, index) => (

          <div

            key={index + 1}
            className='card-container'
            onClick={() => handleMovie(obj.id)}
          >

            <img
              src={`${imageUrl + obj.poster_path}`}
              alt='movies'
              className='cards'
            />
          </div>
        ))}

      </div>
      <i id='right' onClick={scrollRight}
        class="bx bx-caret-right" />
    </div>


  )
}

export default RowCards
