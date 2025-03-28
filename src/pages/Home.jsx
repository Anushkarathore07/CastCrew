import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Typography } from "@mui/material";

const Home = () => {
  const { movies, genres, loading } = useContext(MovieContext);
  const [sortType, setSortType] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All"); // "All" is default
  const navigate = useNavigate(); // For navigation

  const genreList = ["All", ...Object.values(genres)];

  // Sorting function
  const sortMovies = (a, b) => {
    if (sortType === "rating") return b.vote_average - a.vote_average;
    if (sortType === "year") return new Date(b.release_date) - new Date(a.release_date);
    return 0;
  };

  // Filtering function
  const filteredMovies = selectedGenre === "All"
    ? movies
    : movies.filter((movie) => movie.genre_ids.some((id) => genres[id] === selectedGenre));

  const sortedMovies = [...filteredMovies].sort(sortMovies);

  if (loading) return <h2>Loading movies...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Movie List</h1>

      {/* Sorting & Filtering Controls */}
      <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
        <Select value={sortType} onChange={(e) => setSortType(e.target.value)} displayEmpty>
          <MenuItem value="">Sort By</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="year">Release Year</MenuItem>
        </Select>

        <Select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} displayEmpty>
          {genreList.map((genre, index) => (
            <MenuItem key={index} value={genre}>
              {genre}
            </MenuItem>
          ))}
        </Select>
      </div>

      {/* Show "No Movies Found" if filter results are empty */}
      {sortedMovies.length === 0 ? (
        <Typography variant="h6" color="error">
          No movies found for "{selectedGenre}"
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell>Release Year</TableCell>
                <TableCell>Rating</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedMovies.map((movie) => (
                <TableRow key={movie.id} style={{ cursor: "pointer" }} onClick={() => navigate(`/movie/${movie.id}`)}>
                  <TableCell>{movie.title}</TableCell>
                  <TableCell>
                    {movie.genre_ids.map((id) => genres[id]).join(", ")}
                  </TableCell>
                  <TableCell>{movie.release_date.split("-")[0]}</TableCell>
                  <TableCell>{movie.vote_average}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Home;
