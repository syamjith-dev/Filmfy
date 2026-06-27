import React, { useEffect, useState, useRef } from 'react'
import "./Banner.css";
import axios from '../../axios';
import { imageUrl } from '../../Constants/Constants';
import { useContext } from 'react';
import { PlayerContext } from '../../Context/PlayerContext';



const Banner = (props) => {


    const rowRef = useRef();

    const [posters, setPosters] = useState([])
    const [movie, setMovie] = useState({})
    const { setUrlId } = useContext(PlayerContext);
    const [addedMovies, setAddedMovies] = useState([])
    const [logo, setLogo] = useState(null);

    useEffect(() => {
        async function fetchData() {

            const response = await axios.get(
                `/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_original_language=ml`
            );

            const movies = response.data.results;

            const randomMovie =
                movies[Math.floor(Math.random() * movies.length)];

            setMovie(randomMovie);

            fetchMovieLogo(randomMovie.id);
        }

        fetchData();
    }, []);

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


    // FETCH MOVIES
    useEffect(() => {
        axios.get(props.url)
            .then((response) => {
                setPosters(response.data.results);

            })


    },);
    //btn-scrolling
    const scrollLeft = () => {
        rowRef.current.scrollLeft -= 600;
    };

    const scrollRight = () => {
        rowRef.current.scrollLeft += 600;
    };

    const rightArrow = document.getElementById("right");
    const leftArrow = document.getElementById("left");

    if (rightArrow && leftArrow) {

        rightArrow.addEventListener("click", () => {
            leftArrow.style.display = "block";
        });

    }
    useEffect(() => {

        if (movie?.id) {
            fetchMovieLogo(movie.id);
        }

    }, [movie]);

    // posters click
    const handleClick = (movie) => {
        setMovie(movie)


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

            await axios.post(
                "https://cineverse-5xo9.onrender.com/api/watchlist/add",
                {
                    movieId: movie.id,
                    title: movie.title,
                    poster: movie.poster_path,
                    backdrop: movie.backdrop_path,
                    vote_average: movie.vote_average,
                    original_language: movie.original_language,
                    overview: movie.overview
                },
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            alert("Movie added to wathclist!")

            setAddedMovies(prev => [...prev, movie.id]);

        } catch (error) {
            alert("Please login first!")
        }
    };



    return (
        <div style={{ backgroundImage: movie?.backdrop_path ? `url(${imageUrl}${movie.backdrop_path})` : "none", }}
            className="banner">
            <div className='content'>
                <h1 className='rowcardTittle'>{
                    logo ? (

                        <img
                            src={`${imageUrl}${logo}`}
                            alt="movie logo"
                            className="banner_logo"
                        />

                    ) : (

                        <h1 className="tittle">
                            {movie.title}
                        </h1>

                    )
                }</h1>
                <div className="banner_buttons">
                    <button onClick={() => handleMovie(movie.id)}
                        className="button btn1"><i className="bxf bx-play" />Watch Now</button>
                    <button className="button btn2" id='addBtn' onClick={addWatchlist}
                        disabled={addedMovies.includes(movie.id)}>
                        <i className="bxf bx-list-plus" />
                        {
                            addedMovies.includes(movie.id)
                                ? "Added"
                                : "Add"
                        }
                    </button>
                </div>
                <h3 className='raitng-lang'>⭐{movie.vote_average} | {movie.release_date} | {movie.original_language === "ml" ? "Malayalam" : movie.original_language}</h3>
                <p className="discription">{movie ? movie.overview : ""} </p>
            </div>

            {/* row-posters */}
            <div className='posters-row'>

                <i
                    id='left'
                    onClick={scrollLeft}
                    className="bx bx-caret-left"
                />

                <div className="img-container" ref={rowRef}>
                    <h1 className='subTittle'>{props.tittle}</h1>

                    {posters.map((obj) => (
                        <img
                            key={obj.id}
                            src={`${imageUrl}${obj.poster_path}`}
                            alt='movies'
                            className='posters'
                            onClick={() => handleClick(obj)}
                        />
                    ))}
                </div>

                <i
                    id='right'
                    onClick={scrollRight}
                    className="bx bx-caret-right"
                />

            </div>

        </div>

    )
}

export default Banner
