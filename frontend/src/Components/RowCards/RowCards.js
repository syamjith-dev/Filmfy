import React, { useEffect, useState, useRef } from 'react'
import "./RowCards.css"
import axios from "../../axios"
import { imageUrl } from '../../Constants/Constants'
import { useContext } from 'react';
import { PlayerContext } from '../../Context/PlayerContext';

const RowCards = (props) => {


  const [posters, setPosters] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const { setUrlId } = useContext(PlayerContext);
  const [addedMovies, setAddedMovies] = useState([])
  const [logo, setLogo] = useState(null);

  const rowRef = useRef();

  const fetchMovieLogo = async (movieId) => {
    setLogo(null)

    try {

      const response = await axios.get(
        `/movie/${movieId}/images?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      );

      const logos = response.data.logos;

      const englishLogo =
        logos.find(
          logo => logo.iso_639_1 === "en"
        );

      if (englishLogo) {

        setLogo(
          englishLogo.file_path
        );

      } else if (logos.length > 0) {

        setLogo(
          logos[0].file_path
        );
      }

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    if (selectedMovie?.id) {
      fetchMovieLogo(selectedMovie.id);
    }

  }, [selectedMovie]);

  // FETCH MOVIES
  useEffect(() => {

    axios.get(props.url)
      .then((response) => {
        setPosters(response.data.results);
      })

  }, [props.url]);

  // SCROLL LEFT
  const scrollLeft = () => {
    rowRef.current.scrollLeft -= 300;
  };

  // SCROLL RIGHT
  const scrollRight = () => {
    rowRef.current.scrollLeft += 300;
  };

  const handleMovie = (id) => {
    console.log(id)
    axios.get(`/movie/${id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`).then((response) => {
      if (response.data.results.length !== 0) {
        console.log(response.data.results)
        setUrlId(response.data.results[0].key)
      } else {
        console.log("trailer not available")
        alert("Sorry trailer not availble!")
      }

    })
  }

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://cineverse-5xo9.onrender.com/api/watchlist",
        {
          headers: {
            Authorization: token
          }
        }
      );

      const ids = response.data.map(item => item.movieId);

      setAddedMovies(ids);

    } catch (error) {
      console.log(error);
    }
  };

  const addWatchlist = async () => {

    try {

      const token = localStorage.getItem("token");

      console.log(selectedMovie);

      const res = await axios.post(
        "https://cineverse-5xo9.onrender.com/api/watchlist/add",
        {
          movieId: selectedMovie.id,
          title: selectedMovie.title,
          poster: selectedMovie.poster_path,
          backdrop: selectedMovie.backdrop_path,
          vote_average: selectedMovie.vote_average,
          original_language: selectedMovie.original_language,
          overview: selectedMovie.overview
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      // navigate('/watchlist')

      alert(res.data.message);

      setAddedMovies(prev => [
        ...prev,
        selectedMovie.id
      ])


    } catch (error) {

      console.log(error.response?.data);
      alert("Failed to add movie");

    }

  };


  return (
    <>

      <div className='divmain'>

        <div className='movies-row'>

          {/* LEFT ARROW */}
          <i
            onClick={scrollLeft}
            className="bx bx-caret-left left-arrow" 
          />

          {/* POSTERS */}
          <div className="img-container" ref={rowRef}>

            <h1 className='subTittle'>
              {props.tittle}
            </h1>

            {posters.map((movie) => (

              <img
                key={movie.id}
                src={`${imageUrl}${movie.poster_path}`}
                alt='movies'
                className='movies'

                onClick={() => setSelectedMovie(movie)}
              />

            ))}

          </div>

          {/* RIGHT ARROW */}
          <i
            onClick={scrollRight}
            className="bx bx-caret-right right-arrow" 
          />

        </div>

      </div>

      {/* MODAL */}

      {selectedMovie && (

        <div className="overlay">

          <div className="movie-modal">

            {/* CLOSE BTN */}
            <button
              className='close-btn'
              onClick={() => setSelectedMovie(null)}
            >
              ✕
            </button>

            {/* IMAGE */}
            <img
              src={`${imageUrl}${selectedMovie.poster_path}`}
              alt=""
              className='modal-banner'
            />

            {/* CONTENT */}
            <div className='modal-content'>

              <h1 className='tittle'>{
                logo ? (

                  <img
                    src={`${imageUrl}${logo}`}
                    alt="movie logo"
                    className="rowcard_logo"
                  />

                ) : (

                  <h1 className="tittle">
                    {selectedMovie.title}
                  </h1>

                )
              }</h1>

              <div className='movie-info'>

                <span>
                  ⭐ {selectedMovie.vote_average}
                </span>

                <span>
                  {selectedMovie.release_date}
                </span>

                <span>
                  {selectedMovie.original_language === "ml" ? "Malayalam" : selectedMovie.original_language}
                </span>

              </div>

              <p>
                {selectedMovie.overview}
              </p>

              <div className='buttons'>

                <button onClick={() => handleMovie(selectedMovie.id)}
                  className='watch-btn'>
                  ▶ Watch Now
                </button>

                <button className='add-btn' id='addBtn' onClick={addWatchlist}
                  disabled={addedMovies.includes(selectedMovie.id)}>
                  {
                    addedMovies.includes(selectedMovie.id)
                      ? "Added"
                      : "Add"
                  }
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </>
  )
}

export default RowCards