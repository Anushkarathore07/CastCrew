import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MovieContext = createContext();


const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const MOVIE_API = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
const GENRE_API = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoviesAndGenres = async () => {
      try {
        // Fetch movies
        const movieRes = await axios.get(MOVIE_API);
        setMovies(movieRes.data.results);

        // Fetch genres
        const genreRes = await axios.get(GENRE_API);
        const genreMap = {};
        genreRes.data.genres.forEach((genre) => {
          genreMap[genre.id] = genre.name;
        });
        setGenres(genreMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesAndGenres();
  }, []);

  return (
    <MovieContext.Provider value={{ movies, genres, loading }}>
      {children}
    </MovieContext.Provider>
  );
};
