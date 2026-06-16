import { useEffect, useState } from "react";
import './watchlist.css';
import { useContext } from 'react';
import { PlayerContext } from '../../Context/PlayerContext';
import { useNavigate, Link } from "react-router-dom";


import axios from '../../axios';

const Watchlist = () => {

  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const { setUrlId } = useContext(PlayerContext);

  useEffect(() => {

    fetchWatchlist();

  }, []);

  const fetchWatchlist =
    async () => {

      const token =
        localStorage.getItem("token");

      const res =
        await axios.get(

          "http://localhost:5000/api/watchlist",

          {
            headers: {
              Authorization: token
            }
          }

        );

      setMovies(res.data);

    };

  const handleMovie = (Id) => {
    console.log(Id)
    axios.get(`/movie/${Id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`).then((response) => {
      if (response.data.results.length !== 0) {
        console.log(response.data.results)
        setUrlId(response.data.results[0].key)
        navigate('/')
      } else {
        console.log("trailer not available")
        alert("Sorry trailer not availble!")
      }

    })
  };

  const removeMovie = async (movieId) => {
    console.log("Deleting movieId:", movieId);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:5000/api/watchlist/${movieId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Remove this movie in watchlist?")

      setMovies(prev =>
        prev.filter(movie => movie.movieId !== movieId)
      );

      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (

    <div>
      <Link to='/' className="home-btn">
      <i class="bx bx-arrow-big-left-line" /> Home
      </Link>
      <h1 className="main-title">
        My Watchlist
      </h1>
      <div className="watchlist-item">
        {
          movies.map(movie => (
            <div className="listed-movies">
              <img className="movie-poster"
                key={movie.movieId}
                src={
                  "https://image.tmdb.org/t/p/w500" +
                  movie.poster
                }
                alt="movie img "
              />
              <div className="movie-details">
                <h1 className="movie-title">{movie.title}</h1><br />
                <p className="rating">⭐ {movie.vote_average} | {movie.original_language === "ml" ? "Malayalam" : movie.original_language }</p> <br />
                <p className="about-movie">{movie.overview}</p>
                <button className="btn-watch" onClick={() => handleMovie(movie.movieId)} >
                  Watch Now
                </button>
                <button className="remove-btn" onClick={() => removeMovie(movie.movieId)}>
                  <i class="bx bx-trash" />Remove
                </button>
              </div>
            </div>
          ))

        }

      </div>
    </div>

  );

};

export default Watchlist;
