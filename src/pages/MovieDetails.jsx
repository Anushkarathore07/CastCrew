import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, CircularProgress, Container, Paper, Box } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const API_KEY = "d150cf6a0e97924e7aea0928928e8676"; // Replace with your actual TMDB API key

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <CircularProgress style={{ margin: "20px auto", display: "block" }} />;

  if (!movie) return <Typography variant="h5" align="center">Movie not found</Typography>;

  return (


    <Container maxWidth="md" style={{ marginTop: "30px" }}>
      <Paper elevation={3} style={{ padding: "20px", textAlign: "center", borderRadius: "10px" }}>
        <IconButton
          component={Link}
          to="/"
          color="primary"
          sx={{ position: "absolute", top: 20, left: 20 }}
        >
          <HomeIcon fontSize="large" />
        </IconButton>
        <Typography variant="h3" gutterBottom>{movie.title}</Typography>

        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            style={{ borderRadius: "10px", marginBottom: "15px" }}
          />
          <Typography variant="subtitle1" color="textSecondary">
            Release Date: {new Date(movie.release_date).toDateString()}
          </Typography>
        </Box>

        <Typography variant="body1" style={{ marginTop: "20px", fontSize: "18px", lineHeight: "1.6" }}>
          {movie.overview}
        </Typography>

        <Typography variant="h5" style={{ marginTop: "30px", fontWeight: "bold" }}>Director</Typography>
        {movie.credits.crew.filter((crew) => crew.job === "Director").map((director) => (
          <Typography key={director.id} variant="body1" style={{ fontWeight: "500", marginBottom: "5px" }}>
            {director.name}
          </Typography>
        ))}

        <Typography variant="h5" style={{ marginTop: "30px", fontWeight: "bold" }}>Cast</Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap="15px" marginTop="10px">
          {movie.credits.cast.slice(0, 10).map((actor) => (
            <Paper key={actor.id} elevation={2} style={{ padding: "10px", borderRadius: "8px", textAlign: "center" }}>
              <Typography variant="body1" style={{ fontWeight: "500" }}>
                {actor.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                as {actor.character}
              </Typography>
            </Paper>
          ))}
        </Box>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
          onClick={() => navigate(`/cast/${movie.id}`)}
        >
          View Full Cast & Crew
        </Button>
      </Paper>
    </Container>
  );
};

export default MovieDetails;
