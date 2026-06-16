
export const TopRated = 
`/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_original_language=ml&sort_by=popularity.desc`;

export const ActionMovies = 
`discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_original_language=ml&with_genres=28&sort_by=popularity.desc&page=1`;

export const ThrillerMovies = 
`discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_original_language=ml&with_genres=53&sort_by=popularity.desc&page=1`;

  export const HorrorMovies = 
  `discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_original_language=ml&with_genres=27&sort_by=popularity.desc&page=1`;